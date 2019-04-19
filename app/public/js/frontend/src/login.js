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

function check(form) {
    var mobileExp = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
    var emailExp = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    if (!mobileExp.test(form.username.value) && !emailExp.test(form.username.value)) {
        index.$Notice.error({
            title: "请输入正确的手机或邮箱格式！",
            duration: 2
        });
        form.username.focus();
        return false
    }
    if (form.password.value.length < 6) {
        index.$Notice.error({
            title: "密码位数至少6位！",
            duration: 2
        });
        form.password.focus();
        return false
    }
    return true;
}

$(document).ready(function () {
	getBrowserInfo();
});
