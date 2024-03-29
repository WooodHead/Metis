/**
 * Created with JetBrains WebStorm.
 * User: ty
 * Date: 14-10-5
 * Time: 下午5:34
 * To change this template use File | Settings | File Templates.
 */
var config = {
    uploader: {
        url: "file/uploadMultiFile",
        swfUrl: "resources/js/lib/Moxie.swf",
        sizes: {
            all: "30m",
            img: "2m"
        },
        filters: {
            all: "*",
            zip: "zip,rar",
            img: "jpg,JPG,jpeg,JPEG,png,PNG"
        },
        qiNiu: {
            upTokenUrl: "qi-niu/up-token",
            uploadDomain: "http://qiniu-plupload.qiniudn.com/",
            bucketDomain: "http://7xplk9.com1.z0.glb.clouddn.com/"
        },
        aLiYun:{
            region:"oss-cn-shanghai"
        },
        fileType: {
            productPath:1,
            attachmentPath:2,
            judgesPath:3,
            newsPath:4,
            othersPath:5
        }
    },
    perLoadCounts:{
        table:12	//请求12条数据	10
    },
    cssHeight:{
    	headHeight:210,
    	footHeight:80
    },
    // 正则表达式
    regexString:{
        email:new RegExp("^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$"),
        phone:new RegExp("^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$"),
        chinese:new RegExp("^[\u4e00-\u9fa5]{0,}$")
    },
    ajaxUrls: {
        imageGet: "file/image",
        fileGet: "file/downloadFile",
        setPwd: "user/resetYourPwd",
        register: "user/register",
        resetInfo: "user/update",
        resetPwd: "/website/user/updatePwd",
        workCreate: "/website/production",
        workUpdate: "/website/production/:id",
        workDetail: "/website/production/:id",
        getDetailByIdForJudge:"/website/production/getDetailByIdForJudge/:id",
        workRemove: "/website/production/:id",
        worksGetByPage: "/website/production/listProductionByUserId",
        //attachUpload: "/file/uploadMultiFile",			//服务器端路径********需要更改************
        attachUpload: "/dcpro/file/uploadMultiFile",		//附件上传路径问题解决方案/DesignYL/+
        judgeToScoreList:"/website/review/getReviewListByJudgeId",
        judgeScore:"/website/review/updateReviewScore/:id",
        getBackPwdWithEmail:"/website/user/getBackPwdWithEmail",
        updatePwdWithMobileAndSmsCode:"/website/user/updatePwdWithMobileAndSmsCode",
        updatePwdWithEmailAndActiveCode: "/website/user/updatePwdWithEmailAndActiveCode",

        manageNews:"/website/news",
        newsDetail:"/website/news/:id",
        judgeGetByPage:"/website/judge",
        judgeDetail:"/website/judge/:id",

        // register 界面
        sendMobileCode:"/website/sms/sendMessage?mobile=",
        vertifyCode:"/website/sms/vertifySms",
        sendGetBackPwdSms:"/website/sms/sendGetBackPwdSms",     //找回密码：发送短信
        getCaptcha:"/getCaptcha",
        checkCaptcha:"/checkCaptcha",
        createUser:"/website/user/createUser",

        getSTSSignature:"/getSTSSignature/:fileType",       //附件上传
        getUrlSignature:"/getUrlSignature"
    },
    viewUrls: {
        login: "login",
        works: "/works",
        judgeIndex:"review/judgeIndex/:round"
    },
    workGroup: {
        "1": "产品组",
        "2": "概念组"
    },
    workType: {
        "1": "生活辅助类",
        "2": "智能养老类",
        "3": "综合设计类"
    },
    workStatus: {
        "1": "已提交",
        "2": "审核未通过",
        "3": "审核已通过",
        "4": "初选入围",
        "5": "初选未入围",
        "6": "复选入围",
        "7": "复选未入围"
    },
    validErrors: {
        required: "请输入此字段！",
        email: "请输入正确的邮箱格式！",
        emailExist: "邮箱已经存在！",
        uploadImg: "请上传图片！",
        number: "请输入数字",
        maxLength: "此字段最多输入${max}个字！",
        minLength: "此字段最少输入${min}个字！",
        rangLength: "此字段只能输入${min}-${max}个字！",
        rang: "此字段只能输入${min}-${max}之间的整数！",
        pwdNotEqual: "两次输入的密码不一样！"
    },
    messages: {
        successTitle: "成功提示",
        errorTitle: "错误提示",
        optSuccess: "操作成功！",
        noData: "没有数据",
        progress: "处理中...",
        uploaded: "上传完成！",
        confirmDelete: "确定删除吗？",
        confirm: "确定执行此操作吗？",
        noSelected: "没有选中任何记录！",
        notFound: "资源丢失！",
        loadDataError: "请求数据失败！",
        networkError: "网络异常，请稍后重试！",
        systemError: "系统错误，请稍后重试或者联系mail@lotusprize.com！",
        optSuccRedirect: "操作成功,3秒后跳转到管理页！",
        timeout: "登录超时，3秒后自动跳到登陆页！",
        optError: "服务器端异常，请稍后重试！",
        uploadSizeError: "最大文件大小${value}！",
        uploadExtensionError: "只允许上传${value}！",
        uploadIOError: "上传出错，请稍后重试！",
        imageSizeError: "图片大小不符合！",
        emailSend: "请进入邮箱进行密码的修改！",
        optSuccessToLogin: "成功，3秒后跳转到登陆！",
        registerSuccess: "注册成功，请进入邮箱激活账号！",
        pleaseEnterPersonalInfo: "请填写参与者信息，*为必填！",
        pleaseEnterWorkInfo: "请填写完整作品信息，*为必填！",
        scoreSaved:"评分以保存，页面2秒后自动返回到您的打分列表页！",
        scoreError:"请输入正确的分数"
    }
};

//判断360浏览器8以下版本
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
            $(".JMNoticeBoardLeft").css("top","0px");
            $(".JMNoticeBoardRight .JMItem").css({"top":"0px","left":"0px"});
        }
    }
}
var lang = document.cookie.split("=")[1];
$(document).ready(function () {

	getBrowserInfo();

    $("input[type='text'],input[type='email']").blur(function () {
        $(this).val($(this).val().trim());
    });

    //阻止form提交
    $("form").keydown(function (e) {
        if (e.keyCode == 13) {
            return false;
        }
    });
    if (pageName) {
        var target = $(".JMLink[data-page-name='" + pageName + "']");
        if (target) {
            target.addClass("JMActive");
        }
    }
    if (pageName) {
        var target = $(".zyLink[data-page-name='" + pageName + "']");
        if (target) {
            target.addClass("zyActive");
        }
    }

	$(".JMIconUser").hover(function(){
		$(".JMIconUser").parent().css("background","#47a8a9");
    	$(".JMIconUser").css("background-image","url(../../../../public/images/iconUser.png)");
    })
    $(".JMIconUser").mouseleave(function(){
		$(".JMIconUser").parent().css("background","white");
    	$(".JMIconUser").css("background-image","url(../../../../public/images/iconUser.png)");
    })

    // 判断中英文切换按键状态
    // if(lang == "zh-cn"){
    //     $(".lang_zh").addClass('active');
    //     $(".lang_en").removeClass('active');
    // }else if(lang == "en-us"){
    //     $(".lang_en").addClass('active');
    //     $(".lang_zh").removeClass('active');
    // }

    //zySelect控件
    $(document).click(function (e) {
        if ($(e.target).parents(".zySelect").length == 0) {
            $(".zySelect .zyOptionList").addClass("zyHidden");
        }
    });
    $(".zySelect .zyInput").click(function () {
        $(this).parent(".zySelect").find(".zyOptionList").removeClass("zyHidden");
    });
    $(".zySelect .zyOption").click(function () {
        var selectEl = $(this).parents(".zySelect");
        selectEl.find(".zySelectValue").val($(this).data("value"));
        selectEl.find(".zyInput").val($(this).text());
        selectEl.find(".zyOptionList").addClass("zyHidden");
    })
});
