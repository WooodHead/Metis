$(document).ready(function() {
	$.ajax({
		type : 'get',
		url : '/getCountDownDay',
		cache : true,
		dataType : 'json',
		success : function(res) {
			$("#countDown").html(res)
		}
	});
});
