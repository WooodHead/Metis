var pageName = "setting";
var resetInfo = new Vue({
    el: ".index",
    data: function() {
        return {
            formPwd: {
                oldPwd: "",
                password: "",
                confirmPwd: ""
            },
            ruleDataSourse: {
                oldPwd: [{
                    required: true,
                    min: 6,
                    message: '请字数控制在6以上',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    min: 6,
                    message: '请字数控制在6以上',
                    trigger: 'blur'
                }],
                confirmPwd: [{
                    required: true,
                    min: 6,
                    message: '请字数控制在6以上',
                    trigger: 'blur'
                }]
            },
            resetInfoStyle: {
                width: "40%",
                minHeight: "",
                margin: "20px auto"
            },
            showPwdError: false,
			errorTitle:"",
        }
    },
    methods: {
        submitPwd: function() {
			var that = this;
            if (this.formPwd.password === this.formPwd.confirmPwd && this.formPwd.password) {
				if(this.formPwd.oldPwd != ""){
					this.showPwdError = false;
	                this.$Loading.start();
	                $.ajax({
	                    url: config.ajaxUrls.resetPwd,
	                    type: "put",
	                    dataType: "json",
	                    data: {
	                        newPwd: this.formPwd.password,
	                        password: this.formPwd.oldPwd
	                    },
	                    success: function(response) {
	                        if (response.status == 200) {
	                            that.$Loading.finish();
	                            that.$Notice.success({
	                                title: response.data
	                            });
								that.formPwd.oldPwd = "";
								that.formPwd.password = "";
								that.formPwd.confirmPwd = "";
	                        } else {
	                            that.$Loading.error();
	                            that.$Notice.error({
	                                title: response.data
	                            });
	                        }
	                    },
	                    error: function() {
	                        that.$Notice.error({
	                            title: config.messages.networkError
	                        });
	                    }
	                })
				}else{
	                this.showPwdError = true;
					this.errorTitle = "请输入旧密码！";
				}
            } else {
                this.showPwdError = true;
				this.errorTitle = "两次输入密码不一致，请重新输入！";
            }
        },
        checkPwd: function() {
            if (this.formPwd.password === this.formPwd.confirmPwd) {
                this.showPwdError = false;
            } else {
                this.showPwdError = true;
            }
        }
    },
    created: function() {
        this.resetInfoStyle.minHeight = document.documentElement.clientHeight - config.cssHeight.headHeight - config.cssHeight.footHeight - 115 + "px";
    }
})
