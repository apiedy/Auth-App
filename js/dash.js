var url_user;
function saveUser(x) {
	url_user = x;
}

function getUser() {
	return url_user;
}

function dash_display() {
	var url1 = getUser();
	$.getJSON(url1,function(response) {
		$("#wlc_msg").html("Welcome, "+ response.name);
		$.each(response.social, function(k,l){
			if (k === "fb") {
				$(".fb_card").html("<div class='panel panel-default'>" +
						'<div class="panel-heading">'+
							'Facebook'+
						'</div>'+
						'<div class="panel-body">'+
							'<img src="'+ response.social.fb.picture.data.url +'" class="img-circle" width="100" height="100">'+
							'<div class="form-group">'+
								'<label>First Name</label>'+
								'<p>'+response.social.fb.first_name+'</p>'+
							'</div>'+
							'<div class="form-group">'+
								'<label>Last Name</label>'+
								'<p>'+response.social.fb.last_name+'</p>'+
							'</div>'+
							'<div class="form-group">'+
								'<label>Email</label>'+
								'<p>'+response.email+'</p>'+
							'</div>'+
						'</div>'+
					'</div>');
			}
			if (k === "google"){
				$(".google_card").html("<div class='panel panel-default'>" +
						'<div class="panel-heading">'+
							'Google'+
						'</div>'+
						'<div class="panel-body">'+
							'<img src="'+ response.social.google.picture_url +'" class="img-circle" width="100" height="100">'+
							'<div class="form-group">'+
								'<label>First Name</label>'+
								'<p>'+response.social.google.first_name+'</p>'+
							'</div>'+
							'<div class="form-group">'+
								'<label>Last Name</label>'+
								'<p>'+response.social.google.last_name+'</p>'+
							'</div>'+
							'<div class="form-group">'+
								'<label>Email</label>'+
								'<p>'+response.email+'</p>'+
							'</div>'+
						'</div>'+
					'</div>');
			} 
		});
	});
}
