// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
	console.log('statusChangeCallback');
	console.log(response);
	// The response object is returned with a status field that lets the
	// app know the current login status of the person.
	// Full docs on the response object can be found in the documentation
	// for FB.getLoginStatus().
	if (response.status === 'connected') {
		// Logged into your app and Facebook.
		$(".card-wrapper").css("display","none");
		$(".info-wrap").css("display","block");
		$("#fb_logout").css("display","block");
	    testAPI();
	} 
	else {
	    // The person is not logged into your app or we are unable to tell.
	    document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
	    }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
	FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
	});
}

window.fbAsyncInit = function() {
	FB.init({
	    appId      : 'your app id',
	    cookie     : true,  // enable cookies to allow the server to access 
	                        // the session
	    xfbml      : true,  // parse social plugins on this page
	    version    : 'v2.9' // use graph api version 2.8
	});

	// Now that we've initialized the JavaScript SDK, we call 
	// FB.getLoginStatus().  This function gets the state of the
	// person visiting this page and can return one of three states to
	// the callback you provide.  They can be:
	//
	// 1. Logged into your app ('connected')
	// 2. Logged into Facebook, but not your app ('not_authorized')
	// 3. Not logged into Facebook and can't tell if they are logged into
	//    your app or not.
	//
	// These three cases are handled in the callback function.

	FB.getLoginStatus(function(response) {
	    statusChangeCallback(response);
	});
};

// Load the SDK asynchronously
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));  

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
    FB.api('/me?fields=id,name,first_name,last_name,picture,email', function(response) {
    	var fb_user = response;
    	checkDup(response.email, function(existing_user,id){
	    	if (!existing_user) {
	    		var user = {
	    			"name": response.name,
	    			"email": response.email,
	    			"social": {
	    				"fb": response
	    			}
	    		};
	    		user = JSON.stringify(user);
	    		$.ajax({
	                type: "POST",
	                url: "http://localhost:3030/users",
	                data: user,
	                contentType: "application/json",
	                success: function(data) {
	                    //var obj = jQuery.parseJSON(data); if the dataType is not specified as json uncomment this
	                    // do what ever you want with the server response
	                    saveUser("http://localhost:3030/users/"+data.id);
	                    dash_display();
	                },
	                error: function() {
	                    alert('error handing here');
	                }
	            });
	    	}
	    	else {
	    		checkSocial(id,"fb", function(existing_social) {
	    			if(!existing_social) {
	    				$.get("http://localhost:3030/users/"+id, function(response) {
	                        var up_key = "fb";
	                        var up_val = fb_user;
	                        response.social[up_key] = up_val;	                    
	                        $.ajax({
	                            type: "PUT",
	                            url: "http://localhost:3030/users/"+id,
	                            contentType: "application/json",
	                            data: JSON.stringify(response),
	                            success: function(data) {
	                                console.log(data);
	                            },
	                            error: function() {
	                                alert('error handling PUT');
	                            }
	                        });
	                    });
	                    saveUser("http://localhost:3030/users/"+id);
	                    dash_display();
	    			}
	    			else {
	    				saveUser("http://localhost:3030/users/"+id);
	    				dash_display();
	    			}
	    		});
	    	}
	    	console.log('Successful login for: ' + response.name);
		    document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.first_name + '!';
    	});
	});
}

//Logout function
function logout() {
  	FB.logout(function(response) {
		// Person is now logged out
    	console.log(response);
    	statusChangeCallback(response);
    	$(".info-wrap").css("display","none");
    	$("#fb_logout").css("display","none");
    	$(".card-wrapper").css("display","block");
	});
}
