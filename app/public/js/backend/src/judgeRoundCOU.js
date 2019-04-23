var vm = new Vue({
	el:".judgeRoundCOU",
	data:function(){
		return{
			dataSourse:{
				id:"",
				roundName:"",
				describes:"",
				judge:""
			},
			ruleDataSourse:{
				roundName:{ required: true, message: '请输入轮次名称', trigger: 'blur' }
			},
			submitUrl:"",
			redirectUrl:config.viewUrls.judgeRoundMgr
		}
	},
	created:function(){
    	this.dataSourse.id = window.location.href.split("judgeRoundCOU/")[1];
    	if(this.dataSourse.id  > 0){
    		var that = this;
    		$.ajax({
                type:"get",
                url:config.ajaxUrls.judgeRoundDetail.replace(":id",this.dataSourse.id),
                success:function(response){
                    if(response.status == 200){
                    	that.dataSourse.roundName = response.data.roundName;
                    	that.dataSourse.describes = response.data.describes;
                    	that.dataSourse.judge = response.data.judge;
                    	that.submitUrl = config.ajaxUrls.judgeRoundUpdate;
                    }else{
                    	that.$Notice.error({title:response.message});
                    }
                },
                error:function(){
                	that.$Notice.error({title:config.messages.networkError});
                }
            })
    	}else{
    		this.submitUrl = config.ajaxUrls.judgeRoundCreate;
    	}
	},
	methods:{
		submit:function(){
			var that = this;
			if (this.dataSourse.id > 0) {
				$.ajax({
	    	        url:that.submitUrl.replace(":id",this.dataSourse.id),
	    	        type:"put",
	    	        dataType:"json",
	    	        contentType :"application/json; charset=UTF-8",
	    	        data:JSON.stringify(that.dataSourse),
	    	        success:function(response){
	    	            if(response.status == 200){
	    	                if(that.redirectUrl){
	    	                    that.$Notice.success({title:response.data});
	    	                    setTimeout(function(){
	        	                    window.location.href = that.redirectUrl;
	    	                    },3000);
	    	                }else{
	    	                	that.$Notice.error({title:response.data});
	    	                }
	    	            }else{
	    	            	that.$Notice.error({title:response.data});
	    	            }
	    	        },
	    	        error:function(){
	    	        	that.$Notice.error({title:config.messages.networkError});
	    	        }
	    	    });
			}else {
				$.ajax({
	    	        url:that.submitUrl,
	    	        type:"post",
	    	        dataType:"json",
	    	        contentType :"application/json; charset=UTF-8",
	    	        data:JSON.stringify(that.dataSourse),
	    	        success:function(response){
	    	            if(response.status == 200){
	    	                if(that.redirectUrl){
	    	                    that.$Notice.success({title:response.data});
	    	                    setTimeout(function(){
	        	                    window.location.href = that.redirectUrl;
	    	                    },3000);
	    	                }else{
	    	                	that.$Notice.success({title:response.data});
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
