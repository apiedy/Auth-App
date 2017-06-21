function checkSocial(x,social_pltfrm,callback) {
	var flag = false;
	var data = $.get("http://localhost:3030/users/"+x,function(response){
		if (response.social[social_pltfrm] !== undefined) {
			callback(true);
		}
		else {
			callback(false);
		}
	});
}