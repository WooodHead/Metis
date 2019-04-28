var pageName = "setting";
var resetInfo = new Vue({
    el: ".index",
    data: function() {
        return {
            formPwd: {
                email:"",
                activeCode:"",
                password: "",
                confirmPwd: ""
            },
            ruleDataSourse: {
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
            resetPwdStyle: {
                width: "40%",
                minHeight: "",
                margin: "60px auto"
            },
            showPwdError: false,
			errorTitle:"",
        }
    },
    methods: {
        submitPwd: function() {
			var that = this;
            if (this.formPwd.password === this.formPwd.confirmPwd) {
				this.showPwdError = false;
                this.$Loading.start();
                $.ajax({
                    url: config.ajaxUrls.updatePwdWithEmailAndActiveCode,
                    type: "put",
                    dataType: "json",
                    data: {
                        newPwd: this.formPwd.password,
                        email: this.formPwd.email,
                        activeCode: this.formPwd.activeCode
                    },
                    success: function(response) {
                        if (response.status == 200) {
                            that.$Loading.finish();
                            that.$Notice.success({
                                title: response.data
                            });
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
        this.resetPwdStyle.minHeight = document.documentElement.clientHeight - config.cssHeight.headHeight - config.cssHeight.footHeight -120 + "px";
        this.formPwd.email = window.location.href.split("?")[1].split("&")[0].split("=")[1];
        this.formPwd.activeCode = window.location.href.split("?")[1].split("&")[1].split("=")[1];
    }
})
