function checkDup(x,callback) {
	var flag = false;
	var id;
	var data = $.getJSON("http://localhost:3030/users",function(response){
		$.each(response, function(k, l){
			if (x === l.email)
			{
				flag = true;
				id = l.id;
			}
		});
		callback(flag,id);
	});
}
