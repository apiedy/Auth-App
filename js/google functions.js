function onSignIn(googleUser) {

    var profile = googleUser.getBasicProfile();

    checkDup(profile.getEmail(), function(existing_user,id){
        var g_user = {
            "id" : profile.getId(),
            "name" : profile.getName(),
            "first_name" : profile.getGivenName(),
            "last_name" : profile.getFamilyName(),
            "picture_url" : profile.getImageUrl(),
            "email" : profile.getEmail()
        }
        if (!existing_user) {
            var user = {
                "name": profile.getName(),
                "email": profile.getEmail(),
                "social": {
                    "google": g_user
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
            checkSocial(id,"google", function(existing_social) {
                if(!existing_social) {
                    $.get("http://localhost:3030/users/"+id, function(response) {
                        var up_key = "google";
                        var up_val = g_user;
                        response.social[up_key] = up_val;
                        console.log(response);
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

        $(".card-wrapper").css("display","none");
        $(".info-wrap").css("display","block");
        $("#g_signout").css("display","block");
    });

}

function signOut() {

    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    var revokeAllScopes = function() {
        auth2.disconnect();
    }

    $(".info-wrap").css("display","none");
    $("#g_signout").css("display","none");
    $(".card-wrapper").css("display","block");

}
