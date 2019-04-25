'use strict';

var pageName = "news";

var urllib = OSS.urllib;
var Buffer = OSS.Buffer;
var OSS = OSS.Wrapper;
var STS = OSS.STS;
// ueditor富文本编辑器初始化
var ue = UE.getEditor('content');

var newsCOU = new Vue({
	el:".index",
	data:{
        dataSourse:{
        	id:"",
        	language:"0",
        	title:"",
            news_abstract:"",
            content:"",
            thumb: ""
        },
        ruleDataSourse:{
        	title:[{ required: true,max: 50, message: '请字数控制在50以内', trigger: 'blur' }],
        	news_abstract:[{ required: true,max: 225, message: '请字数控制在225以内', trigger: 'blur' }]
        },
        submitUrl: "",
        redirectUrl:config.viewUrls.newsMgr,

        imgUrl:"",
        fileName:"",
        progressPercent:0
    },
    created: function(){
    	this.dataSourse.id = window.location.href.split("newsCOU/")[1];
    	if(this.dataSourse.id > 0){			//修改
    		var that = this;
    		$.ajax({
                dataType:"json",
                type:"get",
                url:config.ajaxUrls.newsDetail.replace(":id",this.dataSourse.id),
                success:function(response){
                    if(response.status == 200){
                    	that.imgUrl = response.data.thumb;
            	  		that.fileName = response.data.thumb.split("?")[0].split("news/")[1];
            	  		that.progressPercent = 100;
                    	that.dataSourse.title = response.data.title;
                    	that.dataSourse.news_abstract = response.data.news_abstract;
                    	that.dataSourse.content = response.data.content;
                    	if(response.data.language){
                    		that.dataSourse.language = "1";
                    	}else{
                    		that.dataSourse.language = "0";
                    	}
                    	that.submitUrl = config.ajaxUrls.newsUpdate.replace(":id",that.dataSourse.id);
                    }else{
                    	that.$Notice.error({title:response.message});
                    }
                },
                error:function(){
                	that.$Notice.error({title:config.messages.networkError});
                }
            })
    	}else{						//新建
    		this.submitUrl = config.ajaxUrls.newsCreate;
    	}
    },
    methods:{
    	radioChange:function(value){
            if(value == "0"){				//  zh
                this.dataSourse.language = "0";
    		}else if(value == "1"){			//  en
                this.dataSourse.language = "1";
    		}
        },
		doUpload:function(files){
			let that = this;
            let file = files.target.files[0];
            let fileName = calculate_object_name(files.target.files[0].name);
            this.$Notice.success({title:'上传中···'});
            $.ajax({
                url: config.ajaxUrls.getSTSSignature.replace(':fileType',config.uploader.fileType.newsPath),
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
                        client.multipartUpload('news/'+ fileName, file, {
                    		progress: progress
                    	}).then(function (res) {
                            let objectPath = 'news/' + fileName;
							$.ajax({
                                url: config.ajaxUrls.getUrlSignature,
                                type: 'GET',
                                data:{objectPath:objectPath},
                                success:function(res){
									let img = new Image();
									img.src = res;
									img.onload = function(){
										if(img.width == img.height){
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
    	submit: function(){
    		let that = this;
    		this.dataSourse.thumb = this.fileName;
			this.dataSourse.content = ue.getContent();
			if(this.dataSourse.id > 0){
				$.ajax({
	    	        url:that.submitUrl,
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
	    	                    },2000);
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
	    	                	that.$Notice.success({title:response.data});
	    	                    setTimeout(function(){
	        	                    window.location.href = that.redirectUrl;
	    	                    },2000);
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
var progress = function (p) {
	return function (done) {
		newsCOU.progressPercent = p * 100;
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
