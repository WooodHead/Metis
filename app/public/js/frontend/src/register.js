var pageName = "register";
var register = new Vue({
	el:".index",
	data(){
		return{
			smsCodeBol:false,		//手机验证码判断
			captTextBol:false,		//图片验证码判断
			disableBtn:false,		//获取验证码禁止
			mobileCodeText:"点击获取验证码",
			formItem: {
				mobileOrEmail:"1",	// 1 :短信
				email: '',			//邮箱
				realname: '',		//用户名称
				mobile: '',			//手机号码
				smsCode: '',		//手机验证码
				address: '',		//地址
				password: '',		//密码
				confirmPassword:"",
				captchaText: ''		//图片验证码
            },
            registerStyle:{
            	width:"40%",
            	margin:"30px auto",
            	minHeight:""
            }
		}
	},
	computed:{
		disablePhoneSbt(){
			if (this.smsCodeBol && this.captTextBol && this.formItem.realname && this.formItem.password && this.formItem.mobileOrEmail == '1' && this.formItem.mobile) {
					return false;
			}else{
				return true;
			}
		},
		disableEmailSbt(){
			if (this.smsCodeBol && this.captTextBol && this.formItem.realname && this.formItem.password && this.formItem.mobileOrEmail == '0' && this.formItem.email) {
				return false;
			}else{
				return true;
			}
		}
	},
    methods:{
    	//验证方式选择
    	radioChange(value){
			this.formItem.email = '';
			this.formItem.smsCode = '';
			this.formItem.mobile = '';
    		if(value == "0"){				//  email
				this.smsCodeBol = true;
    		}else if(value == "1"){			//  mobile
				this.smsCodeBol = false;
    		}
    	},
    	//发送手机验证短信
    	sendAcodeStg(){
    		var that = this;
    		this.$Loading.start();
			let phoneExp = config.regexString.phone;
    		if(phoneExp.test(this.formItem.mobile)){
    			var url = config.ajaxUrls.sendMobileCode + this.formItem.mobile;
    			$.ajax({
                    dataType:"json",
                    type:"get",
                    url:url,
                    success:function(res){
                        if(res.success){
                    		that.$Loading.finish();
                        	that.$Notice.success({title:res.data, duration:3});
                        	clock(that);
                        }else{
                    		that.$Loading.error();
                        	that.$Notice.error({title:res.data, duration:3});
                        }
                    },
                    error:function(){
                		that.$Loading.error();
                    	that.$Notice.error({title:config.messages.networkError, duration:3});
                    }
                })
    		}else{
        		that.$Loading.error();
    			that.$Notice.error({title:"请输入正确的手机格式", duration:3});
    		}
    	},
    	//验证手机验证码
    	checkMobileCode(event){
			let that = this,
			url = config.ajaxUrls.vertifyCode;
			if(event.target.value.length == 6){
				$.ajax({
	                dataType:"json",
	                type:"GET",
	                url:url,
	                data:{mobile:this.formItem.mobile,code:this.formItem.smsCode},
	                success:function(res){
	                    if(res.status == 200){
	                    	that.$Notice.success({title:res.data, duration:3});
							that.smsCodeBol = true;
	                    }else{
	                    	that.$Notice.error({title:res.data, duration:3});
	                    }
	                },
	                error:function(){
	                	that.$Notice.error({title:config.messages.networkError, duration:3});
	                }
	            })
			}
    	},
    	//验证两次密码输入
    	conPwdBlur(){
    		if(this.formItem.password && this.formItem.confirmPassword != this.formItem.password){
				this.formItem.password = "";
				this.formItem.confirmPassword = "";
    			this.$Notice.error({ title: '输入的密码不一致', duration:3});
    		}
    	},
    	//刷新图片验证码内容
    	tapClick(eve){
			let that = this;
            $.ajax({
                url: config.ajaxUrls.getCaptcha,
                type: 'GET',
                success(res){
                    document.getElementsByTagName("object")[0].innerHTML = res;
                }
            });
        },
		// 验证图片验证码
		checkCaptcha(event){
            let that = this;
            if(event.target.value.length == 5){
                $.ajax({
                    url: config.ajaxUrls.checkCaptcha,
                    type: 'GET',
                    data:{captchaText:this.formItem.captchaText},
                    success(res){
                        if (res.status == 200){
                            that.$Notice.success({title:res.data});
							that.captTextBol = true;
                        }else{
                            that.$Notice.error({title:res.data});
                        }
                    }
                });
            }
        },
        //提交
        submit(name){
        	this.$Loading.start();
			console.log(this.formItem);
        	let that = this,
    		dataUrl = config.ajaxUrls.createUser;
        	$.ajax({
                url:dataUrl,
                type:"POST",
                dataType:"json",
                contentType :"application/json; charset=UTF-8",
                data:JSON.stringify(this.formItem),
                success:function(res){
                    if(res.status == 200){
                        that.$Notice.success({ title: config.messages.optSuccRedirect,duration:3,
                        	onClose:function(){
                        		that.$Loading.finish();
                            	window.location.href = config.viewUrls.login;
                            }
                        });
                    }else{
                    	that.$Loading.error();
                    	that.$Notice.error({ title: res.data,duration:3});
                    }
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){
                     if(textStatus == "parsererror"){
                    	 that.$Loading.error();
                    	 that.$Notice.error({ title: "登陆会话超时，请重新登陆",duration:3});
                     }
                }
            });
        }
    },
    created(){
    	this.registerStyle.minHeight = document.documentElement.clientHeight - config.cssHeight.footHeight - config.cssHeight.headHeight - 60 + "px";
		$.ajax({
            url: config.ajaxUrls.getCaptcha,
            type: 'GET',
            success(res){
                document.getElementsByTagName("object")[0].innerHTML = res;
            }
        });
    }
})
function clock(that){
	var num = 60;
	var int = setInterval(function(){
		num > 0 ? num-- : clearInterval(int);
		that.mobileCodeText = num + "秒后重试";
		that.disableBtn = true;
		if(num == 0){
			that.mobileCodeText = "点击获取验证码";
    		that.disableBtn = false;
		}
	},1000);
}
