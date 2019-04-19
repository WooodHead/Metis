var login = (function (config) {
    return {

    }
})(config);
function getBrowserInfo(){
    var ua = navigator.userAgent.toLocaleLowerCase();
    var browserType=null;
    if (ua.match(/chrome/) != null) {
    	var version = ua.split(" ");
    	var is360 = 0;
    	for(var i=0;i<version.length;i++){
    		if(version[i].match(/chrome/)){
    			is360 = version[i].split("/")[1];
    		}
    	}
        if(is360 < "42"){
            browserType = '360';
            $("body .pCenter").css({position:"initial",left:"0px",top:"0px",margin:"10% auto 0"});
            $("body").css("height","auto");
            $(".close").css("margin-top","-170px");
        }
    }
}
$(document).ready(function () {
	getBrowserInfo();
    $("#myForm").validate({
        rules: {
            username: {
                required: true,
                maxlength: 30
            },
            password: {
                required: true,
                rangelength: [6, 120]
            }
        },
        messages: {
            username: {
                required: config.validErrors.required,
                email: config.validErrors.email,
                maxlength: config.validErrors.maxLength.replace("${max}", 30)
            },
            password: {
                required: config.validErrors.required,
                rangelength: config.validErrors.rangLength.replace("${min}", 6).replace("${max}", 20)
            }
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
});