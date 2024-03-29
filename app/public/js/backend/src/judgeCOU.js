'use strict';

var pageName = "judge";

var bucket = 'dc-jd';
var urllib = OSS.urllib;
var Buffer = OSS.Buffer;
var OSS = OSS.Wrapper;
var STS = OSS.STS;

var judgeCOU = new Vue({
	el:".index",
	data:{
//      图片上传
		imgUrl:"",
        fileName:"",
        progressPercent:0,
//      需要的数据
        dataSourse:{
			language:"1",	//语言： 1 中文
        	headicon: "",
        	id:"",
        	name:"",
        	email:"",
        	sub_title:"",
			category:"0",
        	description:"",
			currentRound:"0"
        },
        ruleDataSourse:{
        	email: [{ required: true,type:"email",message: '请输入正确格式的邮箱', trigger: 'blur' }]
        },
		roundList:[],	//评审轮次数据
        submitUrl: "",
        redirectUrl:config.viewUrls.judgeMgr

    },
    created:function(){
		var that = this;
    	this.dataSourse.id = window.location.href.split("judgeCOU/")[1];

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

    	if(this.dataSourse.id > 0){
    		$.ajax({
                type:"get",
                url:config.ajaxUrls.judgeDetail.replace(":id",this.dataSourse.id),
                success:function(response){
                    if(response.status == 200){
                    	that.imgUrl = response.data.headicon;
            	  		that.fileName = response.data.headicon.split("?")[0].split("judges/")[1];
            	  		that.progressPercent = 100;
						that.dataSourse.language = response.data.language.toString();
                    	that.dataSourse.name =response.data.name;
                    	that.dataSourse.email = response.data.email;
                    	that.dataSourse.sub_title = response.data.sub_title;
						that.dataSourse.description = response.data.description;
                    	that.dataSourse.currentRound = response.data.currentRound ? response.data.currentRound : "0";
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
    		this.submitUrl = config.ajaxUrls.judgeCreate;
    	}
    },
    methods:{
		radioChange:function(value){
            if(value == "1"){				//  zh
                this.dataSourse.language = "1";
    		}else if(value == "2"){			//  en
                this.dataSourse.language = "2";
    		}
        },
    	doUpload:function(files){
			let that = this;
            let file = files.target.files[0];
            let fileName = calculate_object_name(files.target.files[0].name);
            this.$Notice.success({title:'上传中···'});
            $.ajax({
                url: config.ajaxUrls.getSTSSignature.replace(':fileType',config.uploader.fileType.judgesPath),
                type: 'GET',
                success:function(res){
                    if (res.res.status == 200) {
                        let client = new OSS({
							region:config.uploader.aLiYun.region,
                      		accessKeyId: res.credentials.AccessKeyId,
                      		accessKeySecret: res.credentials.AccessKeySecret,
                      		stsToken: res.credentials.SecurityToken,
                          	bucket:config.uploader.aLiYun.bucket
                    	});
                        client.multipartUpload('judges/'+ fileName, file, {
                    		progress: progress
                    	}).then(function (res) {
                            let objectPath = 'judges/' + fileName;
							$.ajax({
                                url: config.ajaxUrls.getUrlSignature,
                                type: 'GET',
                                data:{objectPath:objectPath},
                                success:function(res){
									let img = new Image();
									img.src = res;
									img.onload = function(){
										if(img.width == 360 && img.height == 430){
											that.$Notice.success({title:'上传成功！'});
											that.imgUrl = res;
											that.fileName = fileName;
										}else{
											that.$Notice.error({title:"图片不符合尺寸要求，请重新上传……"});
										}
									}
                                }
                            })
                    	});
                    } else {
                        that.$Notice.error({
                            title:"上传出现异常，请刷新界面重试！"
                        })
                    }
                }
            })
    	},
		changeRound(value){
			this.dataSourse.currentRound = value;
		},
    	submit: function(){
    		this.dataSourse.headicon = this.fileName;
			this.$Loading.start();
    		var that = this;
			if(this.dataSourse.id > 0){
				$.ajax({
	    	        url:that.submitUrl.replace(":id",this.dataSourse.id),
	    	        type:"put",
	    	        dataType:"json",
	    	        contentType :"application/json; charset=UTF-8",
	    	        data:JSON.stringify(that.dataSourse),
	    	        success:function(response){
	    	            if(response.status == 200){
							that.$Loading.finish();
	    	                if(that.redirectUrl){
	    	                	that.$Notice.success({title:response.data});
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
	    	        contentType :"application/json; charset=UTF-8",
	    	        data:JSON.stringify(that.dataSourse),
	    	        success:function(response){
	    	            if(response.status == 200){
	    	                if(that.redirectUrl){
								that.$Loading.finish();
	    	                	that.$Notice.success({title:response.data});
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
	    	        	that.$Notice.error({title:config.messages.networkError});
	    	        }
	    	    });
			}
    	}
    }
})
var progress = function (p) {
	return function (done) {
		judgeCOU.progressPercent = p * 100;
		done();
	}
};
/**
 * 文件名编码
 */
function random_string(len) {
	len = len || 32;
	var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
	var maxPos = chars.length;
	var pwd = '';
	for(let i = 0; i < len; i++) {
		pwd += chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return pwd;
}

function get_suffix(filename) {
	let pos = filename.lastIndexOf('.');
	let suffix = '';
	if(pos != -1) {
		suffix = filename.substring(pos);
	}
	return suffix;
}

function calculate_object_name(filename) {

	let suffix = get_suffix(filename);
	let g_object_name = random_string(10) + suffix;

    return g_object_name;
}
