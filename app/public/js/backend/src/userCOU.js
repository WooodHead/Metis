var pageName  = "user";
var judgeCOU = new Vue({
	el:".index",
	data:{
//      需要的数据
        id:"",
        dataSourse:{
			role:"",
        	realname: "",
        	password:"",
            mobile:"",
        	email:"",
        },
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
    	this.id = window.location.href.split("userCOU/")[1];

		// 获取评审轮次
		$.ajax({
            url: config.ajaxUrls.judgeRoundGetByPage,
            type: "get",
            data: {offset: 0,limit: 100},
            success: function(response) {
                if (response.status == 200) {
                    that.roundList = response.data.rows;
                } else {
                    that.$Notice.error({
                        title:config.messages.networkError
                    });
                }
            }
        });

    	if(this.id > 0){
    		$.ajax({
                type:"get",
                url:config.ajaxUrls.judgeDetail.replace(":id",this.id),
                success:function(response){
					console.log(response);
                    if(response.status == 200){
                    	that.imgUrl = response.data.headicon;
            	  		that.fileName = response.data.headicon.split("?")[0].split("judges/")[1];
            	  		that.progressPercent = 100;
						that.dataSourse.language = response.data.language.toString();
                    	that.dataSourse.name =response.data.name;
                    	that.dataSourse.email = response.data.email;
                    	that.dataSourse.sub_title = response.data.sub_title;
						that.dataSourse.description = response.data.description;
                    	that.dataSourse.currentRound = response.data.currentRound;
                    	that.submitUrl = config.ajaxUrls.judgeUpdate;
                    }else{
	            		that.$Notice.error({title:response.data});
                    }
                },
                error:function(){
            		that.$Notice.error({title:config.messages.networkError});
                }
            })
    	}else{
    		this.submitUrl = config.ajaxUrls.createUserByAdmin;
    	}
    },
    methods:{
		changeRole(value){
			this.dataSourse.role = value;
		},
    	submit: function(){
    		var that = this;
            if(this.dataSourse.mobile){

            }
			if(this.id > 0){
				// $.ajax({
	    	    //     url:that.submitUrl.replace(":id",this.id),
	    	    //     type:"put",
	    	    //     dataType:"json",
	    	    //     contentType :"application/json; charset=UTF-8",
	    	    //     data:JSON.stringify(that.dataSourse),
	    	    //     success:function(response){
	    	    //         if(response.status == 200){
	    	    //             if(that.redirectUrl){
	    	    //             	that.$Notice.success({title:response.data});
	    	    //                 setTimeout(function(){
	        	//                     window.location.href = that.redirectUrl;
	    	    //                 },3000);
	    	    //             }else{
	    	    //             	that.$Notice.warning({title:response.data});
	    	    //             }
	    	    //         }else{
	    	    //         	that.$Notice.error({title:response.data});
	    	    //         }
	    	    //     },
	    	    //     error:function(){
	    	    //     	that.$Notice.error({title:config.messages.networkError});
	    	    //     }
	    	    // });
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
	    	                    setTimeout(function(){
	        	                    window.location.href = that.redirectUrl;
	    	                    },3000);
	    	                }else{
	    	                	that.$Notice.warning({title:response.data});
	    	                }
	    	            }else{
	    	            	that.$Notice.error({title:response.data});
	    	            }
	    	        },
	    	        error:function(){
	    	        	that.$Notice.error({title:config.messages.networkError});
	    	        }
	    	    });
			}
    	}
    }
})
