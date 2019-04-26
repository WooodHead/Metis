var pageName = "setting";
var resetInfo = new Vue({
	el:".resetInfo",
	data:function(){
		return{
			formInfo:{
				realname:realname,
				mobile:mobile,
				address:address
			},
			formPwd:{
        		password:"",
        		confirmPwd:""
        	},
        	ruleDataSourse:{
        		realname:[{ required: true, max: 8, message: '请字数控制在8以内', trigger: 'blur' }],
        		mobile:[{ required: true, len:11, message: '请字数控制在11', trigger: 'blur' }],
        		address:[{ required: true, max: 32, message: '请字数控制在32以内', trigger: 'blur' }],

        		password:[{ required: true, min: 6, message: '请字数控制在6以上', trigger: 'blur' }],
    			confirmPwd:[{ required: true, min:6, message: '请字数控制在6以上', trigger: 'blur' }]
        	},
        	resetInfoStyle:{
        		width:"40%",
	        	minHeight:"",
	        	margin:"20px auto"
        	},
        	pwdRuleDataSourse:"",
        	newPwd:"",
        	showPwdError:false
		}
	},
	methods:{
		submitInfo:function(){
			var that = this;
    		this.$Loading.start();
    		$.ajax({
    	          url: config.ajaxUrls.resetInfo,
    	          type:"post",
    	          dataType:"json",
    	          contentType :"application/json; charset=UTF-8",
    	          data:JSON.stringify(this.formInfo),
    	          success: function (response) {
    	              if (response.success) {
    	            	  that.$Loading.finish();
    	            	  that.$Notice.success({title:config.messages.optSuccess});
    	              } else {
    	            	  that.$Loading.error();
    	            	  that.$Notice.error({title:response.message});
    	              }
    	          },
    	          error: function () {
    	        	  that.$Notice.error({title:config.messages.networkError});
    	          }
    	      })
		},
		submitPwd:function(){
			if(this.formPwd.password === this.formPwd.confirmPwd){
    			this.showPwdError = false;
    			this.newPwd = this.formPwd.password;
    			var that = this;
        		this.$Loading.start();
        		$.ajax({
        	          url: config.ajaxUrls.resetPwd,
        	          type:"post",
        	          dataType:"json",
        	          data: {newPwd:this.newPwd},
        	          success: function (response) {
        	              if (response.success) {
        	            	  that.$Loading.finish();
        	            	  that.$Notice.success({title:config.messages.optSuccess});
        	              } else {
        	            	  that.$Loading.error();
        	            	  that.$Notice.error({title:response.message});
        	              }
        	          },
        	          error: function () {
        	        	  that.$Notice.error({title:config.messages.networkError});
        	          }
        	      })
    		}else{
    			this.showPwdError = true;
    		}
		},
		checkPwd:function(){
    		if(this.formPwd.password === this.formPwd.confirmPwd){
    			this.showPwdError = false;
    		}else{
    			this.showPwdError = true;
    		}
    	}
	},
	created:function(){
		this.resetInfoStyle.minHeight = document.documentElement.clientHeight - config.cssHeight.headHeight - config.cssHeight.footHeight - 120 + "px";
	}
})
