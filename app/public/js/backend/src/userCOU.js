var pageName  = "user";
var judgeCOU = new Vue({
	el:".index",
	data:{
//      需要的数据
        dataSourse:{
            id:"",
			role:"",
        	realname: "",
        	password:"",
            mobile:"",
        	email:"",
        },
        pwdDisable:false,
        ruleDataSourse:{
            role:[{required: true, message: '类型不能为空', trigger: 'blur'}],
            realname:[{required: true, message: '用户名不能为空', trigger: 'blur'}],
            email: [{ required: true,type:"email",message: '请输入正确格式的邮箱', trigger: 'blur' }],
            mobile:[
                {required: true, message: '手机号码不能为空', trigger: 'blur'}
            ],
            password:[
                {required: true, message: '请输入密码', trigger: 'blur'},
                {min:6, message: '密码至少为6位', trigger: 'blur'}
            ],
        },
		roleList:[
            {id:1,title:"管理员"},
            {id:2,title:"评委"},
            {id:3,title:"用户"}
        ],	//评审轮次数据
        submitUrl: "",
        redirectUrl:config.viewUrls.userMgr

    },
    created:function(){
		var that = this;
    	this.dataSourse.id = window.location.href.split("userCOU/")[1];

    	if(this.dataSourse.id > 0){
            this.pwdDisable = true;
    		$.ajax({
                type:"get",
                url:config.ajaxUrls.getUserDetail.replace(":id",this.dataSourse.id),
                success:function(response){
                    if(response.status == 200){
						that.dataSourse.role = response.data.roles[0].Id;
                    	that.dataSourse.realname =response.data.realname;
                    	that.dataSourse.mobile = response.data.mobile;
						that.dataSourse.email = response.data.email;
                        that.submitUrl = config.ajaxUrls.updateUserByAdmin;
                    }else{
	            		that.$Notice.error({title:response.data});
                    }
                },
                error:function(){
            		that.$Notice.error({title:config.messages.networkError});
                }
            })
    	}else{
            this.pwdDisable = false;
    		this.submitUrl = config.ajaxUrls.createUserByAdmin;
    	}
    },
    methods:{
		changeRole(value){
			this.dataSourse.role = value;
		},
    	submit(){
    		var that = this;
            this.$Loading.start();
			if(this.dataSourse.id > 0){
				$.ajax({
	    	        url:that.submitUrl.replace(":id",this.dataSourse.id),
	    	        type:"put",
	    	        dataType:"json",
	    	        data:that.dataSourse,
	    	        success:function(response){
	    	            if(response.status == 200){
	    	                if(that.redirectUrl){
	    	                	that.$Notice.success({title:response.data});
                                that.$Loading.finish();
	    	                    setTimeout(function(){
	        	                    window.location.href = that.redirectUrl;
	    	                    },3000);
	    	                }else{
                                that.$Loading.error();
	    	                	that.$Notice.warning({title:response.data});
	    	                }
	    	            }else{
                            that.$Loading.error();
	    	            	that.$Notice.error({title:response.data});
	    	            }
	    	        },
	    	        error:function(){
                        that.$Loading.error();
	    	        	that.$Notice.error({title:config.messages.networkError});
	    	        }
	    	    });
			}else{
				$.ajax({
	    	        url:that.submitUrl,
	    	        type:"post",
	    	        dataType:"json",
	    	        data:that.dataSourse,
	    	        success:function(response){
	    	            if(response.status == 200){
	    	                if(that.redirectUrl){
	    	                	that.$Notice.success({title:response.data});
                                that.$Loading.finish();
	    	                    setTimeout(function(){
	        	                    window.location.href = that.redirectUrl;
	    	                    },3000);
	    	                }else{
                                that.$Loading.error();
	    	                	that.$Notice.warning({title:response.data});
	    	                }
	    	            }else{
                            that.$Loading.error();
	    	            	that.$Notice.error({title:response.data});
	    	            }
	    	        },
	    	        error:function(){
                        that.$Loading.error();
	    	        	that.$Notice.error({title:config.messages.networkError});
	    	        }
	    	    });
			}
    	}
    }
})
