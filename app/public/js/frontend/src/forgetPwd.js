var pageName = "forgetPwd";
var forgetPwd = new Vue({
	el:".index",
	data:function(){
		return{
			formItem:{
				mobileOrEmail:"1",
				email:"",
				captchaText:"",
				mobile:"",
				mobileCode:"",
				password:"",
				confirmPassword:""
			},
			lock:false,
			disableBtn:false,		//获取验证码禁止
			disableSbt:true,
			mobileCodeText:"点击获取验证码",
			ruleValidate:{
				email:[
				    {required: true, message: '请输入用户邮箱', trigger: 'blur'},
				    {type:"email", message: '请输入正确邮箱格式', trigger: 'blur'}
				],
				captchaText:[
				    {required: true, message: '请输入验证码', trigger: 'blur'},
				    {required: true, len:5, message: '验证码长度有误', trigger: 'blur'}
				],
				mobile:[
        	        {required: true, message: '手机号码不能为空', trigger: 'blur'},
        	        {required: true, len:11, message: '请输入正确手机号码格式', trigger: 'blur'}
            	],
            	mobileCode:[
					{required: true, message: '请输入验证码', trigger: 'blur'},
					{len:6, message: '验证码为6位', trigger: 'blur'}
            	],
            	password:[
               	    {required: true, message: '请输入密码', trigger: 'blur'},
              	    {min:6, message: '密码至少为6位', trigger: 'blur'}
            	],
            	confirmPassword:[
            	    {required: true, message: '请输入密码', trigger: 'blur'},
              	    {min:6, message: '密码至少为6位', trigger: 'blur'}
            	]
			},
			forgetPwdStyle:{
				minHeight:"",
				margin:"0 auto",
			  	marginTop: config.cssHeight.headHeight + 40 + "px",
			  	width:"45%"
			}
		}
	},
	methods:{
		//验证方式选择
    	radioChange:function(value){
    		if(value == "0"){				//  email
    			this.lock = false;
    			this.formItem.email = "";
    			this.formItem.captchaText = "";
				$.ajax({
					url: config.ajaxUrls.getCaptcha,
					type: 'GET',
					success(res){
						document.getElementsByTagName("object")[0].innerHTML = res;
					}
				});
    		}else if(value == "1"){			//  mobile
    			this.formItem.mobile = "";
    			this.formItem.mobileCode = "";
    			this.formItem.password = "";
    			this.formItem.confirmPassword = "";
    			this.disableSbt = true;
    			this.lock = false;
    		}
    	},
    	//发送手机验证短信
    	sendAcodeStg(){
    		var that = this;
    		this.$Loading.start();
    		if(this.formItem.mobile.length == 11){
    			$.ajax({
                    dataType:"json",
                    type:"get",
                    url:config.ajaxUrls.sendGetBackPwdSms,
					data:{mobile:this.formItem.mobile},
                    success(res){
						console.log(res);
                        if(res.status == 200){
                    		that.$Loading.finish();
                        	that.$Notice.success({title:res.data, duration:3});
                        	clock(that);
                        }else{
                    		that.$Loading.error();
                        	that.$Notice.error({title:res.data, duration:3});
                        }
                    },
                    error(){
                		that.$Loading.error();
                    	that.$Notice.error({title:config.messages.networkError, duration:3});
                    }
                })
    		}else if(this.formItem.mobile.length == 0){
        		that.$Loading.error();
    			that.$Notice.error({title:"请输入手机号", duration:3});
    		}
    	},
    	//验证手机验证码
    	checkMobileCode:function(event){
			var that = this,
			url = config.ajaxUrls.vertifyCode;
			if(event.target.value.length == 6){
				$.ajax({
	                dataType:"json",
	                type:"GET",
	                url:url,
	                data:{mobile:this.formItem.mobile,code:this.formItem.mobileCode},
	                success:function(res){
	                    if(res.status == 200){
	                    	that.$Notice.success({title:res.data, duration:3});
	                    	that.lock = true;
                        	that.disableSbt = false;
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
    	conPwdBlur:function(){
    		if(this.formItem.password && this.formItem.confirmPassword != this.formItem.password){
    			this.$Notice.error({ title: '输入的密码不一致', duration:3});
    		}
    	},
    	sendEmail:function(){
			var that = this;
			this.$Loading.start();
			$.ajax({
		        url:config.ajaxUrls.forgetPwd,
		        type:"post",
		        dataType:"json",
		        data:this.formItem,
		        success:function(response){
		            if(response.success){
		    			that.$Loading.finish();
		            	that.$Notice.success({title:config.messages.optSuccess});
		            }else{
		    			that.$Loading.error();
		            	that.$Notice.success({title:response.message});
		            }
		        }
		    });
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
                        }else{
                            that.$Notice.error({title:res.data});
                        }
                    }
                });
            }
        },
		changePwd(){
			var that = this;
			this.$Loading.start();
			$.ajax({
		        url:config.ajaxUrls.updatePwdWithMobileAndSmsCode,
		        type:"put",
		        dataType:"json",
		        data:{
		        	mobile:this.formItem.mobile,
		        	newPwd:this.formItem.password,
		        	smsCode:this.formItem.mobileCode,
		        },
		        success:function(res){
					console.log(res);
		            if(res.success){
		    			that.$Loading.finish();
		            	that.$Notice.success({title:res.data});
		            }else{
		    			that.$Loading.error();
		            	that.$Notice.error({title:res.data});
		            }
		        }
		    });
		}
	},
	created:function(){
		this.forgetPwdStyle.minHeight = document.documentElement.clientHeight - config.cssHeight.footHeight - config.cssHeight.headHeight - 226 + "px";
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
