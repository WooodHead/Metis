'use strict';

var bucket = 'dc-metis';
var urllib = OSS.urllib;
var Buffer = OSS.Buffer;
var OSS = OSS.Wrapper;
var STS = OSS.STS;

var judgeCOU = new Vue({
	el:".judgeCOU",
	data:{
//      图片上传
		imgUrl:"",
        fileName:"",
        progressPercent:0,
//      需要的数据
        dataSourse:{
			language:"0",	//语言： 0 中文
        	headicon: "",
        	id:"",
        	name:"",
        	email:"",
        	sub_title:"",
			category:"0",
        	description:"",
        },
        ruleDataSourse:{
        	email: [{ required: true,type:"email",message: '请输入正确格式的邮箱', trigger: 'blur' }]
        },
        submitUrl: "",
        redirectUrl:config.viewUrls.judgeMgr

    },
    created:function(){
    	this.dataSourse.id = window.location.href.split("judgeCOU/")[1];
    	if(this.dataSourse.id){
    		var that = this;
    		var url = config.ajaxUrls.judgeDetail.replace(":id",this.dataSourse.id);
    		$.ajax({
                dataType:"json",
                type:"get",
                url:url,
                data:{id:that.dataSourse.id},
                success:function(response){
                    if(response.success){
                    	that.imgUrl = response.object.headicon;
            	  		that.fileName = response.object.headicon;
            	  		that.progressPercent = 100;

                    	that.dataSourse.name = response.object.name;
                    	that.dataSourse.email = response.object.email;
                    	that.dataSourse.sub_title = response.object.sub_title;
                    	that.dataSourse.description = response.object.description;
                    	that.submitUrl = config.ajaxUrls.judgeUpdate;
                    }else{
	            		that.$Notice.error({title:response.message});
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
                url: config.ajaxUrls.getSTSSignature.replace(':fileType',config.uploader.fileType.judgesPath),
                type: 'GET',
                success:function(res){
                    if (res.res.status == 200) {
                        let client = new OSS({
							region:config.uploader.aLiYun.region,
                      		accessKeyId: res.credentials.AccessKeyId,
                      		accessKeySecret: res.credentials.AccessKeySecret,
                      		stsToken: res.credentials.SecurityToken,
                          	bucket:bucket
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
    		this.dataSourse.headicon = this.fileName;
			console.log(this.dataSourse);
    		var that = this;
    		$.ajax({
    	        url:that.submitUrl,
    	        type:"post",
    	        dataType:"json",
    	        contentType :"application/json; charset=UTF-8",
    	        data:JSON.stringify(that.dataSourse),
    	        success:function(response){
    	            if(response.success){
						console.log(response);
    	                if(that.redirectUrl){
    	                	that.$Notice.success({title:response.data});
    	                    setTimeout(function(){
        	                    window.location.href=that.redirectUrl;
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
