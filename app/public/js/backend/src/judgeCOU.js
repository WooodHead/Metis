'use strict';

// var appServer = 'http://localhost:8080/dcpro/sigUploadKey/1';
// var bucket = 'dc-sys-pro';
// var region = 'oss-cn-hangzhou';
//
// var urllib = OSS.urllib;
// var Buffer = OSS.Buffer;
// var OSS = OSS.Wrapper;
// var STS = OSS.STS;

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
        	headicon: "",
        	id:"",
        	name:"",
        	enName:"",	//英文名
        	email:"",
        	password:"",
        	subTitle:"",
        	enSubTitle:"",
        	description:"",
        	enDescription:"",
        },
        ruleDataSourse:{
        	email: [{ required: true,type:"email",message: '请输入正确格式的邮箱', trigger: 'blur' }],
        	password: [{ required: true,type:"string",  min:6, message: '请输入至少6位数密码', trigger: 'blur' }]
        },
        submitUrl: "",
        redirectUrl:config.viewUrls.judgeMgr

    },
    created:function(){
    	this.dataSourse.id = window.location.href.split("judge/judgeCOU/")[1];
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
                    	that.dataSourse.enName = response.object.enName;
                    	that.dataSourse.email = response.object.email;
                    	that.dataSourse.password = response.object.password;
                    	that.dataSourse.subTitle = response.object.subTitle;
                    	that.dataSourse.enSubTitle = response.object.enSubTitle;
                    	that.dataSourse.description = response.object.description;
                    	that.dataSourse.enDescription = response.object.enDescription;
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
    	doUpload:function(files){
    		/*
        	urllib.request(appServer, {
          		method: 'GET'
        	}).then(function (result) {
        	  	var creds = JSON.parse(result.data);
        	  	if(creds.success == "true"){
        	  		var client = initClient(creds);
        	  		multipartUpload(client, files, that, progress);
        	  	}
          	});
			*/

			let that = this;
            let file = files.target.files[0];
            let fileName = calculate_object_name(files.target.files[0].name);
            this.$Notice.success({title:'上传中···'});
            $.ajax({
                url: config.ajaxUrls.getSTSSignature.replace(':fileType','3'),
                type: 'GET',
                success:function(res){
                    if (res.res.status == 200) {
                        let client = new OSS({
													region:'oss-cn-shanghai',
                      		accessKeyId: res.credentials.AccessKeyId,
                      		accessKeySecret: res.credentials.AccessKeySecret,
                      		stsToken: res.credentials.SecurityToken,
                          bucket:bucket
                    	});
                        client.multipartUpload('judges/'+ fileName, file).then(function (res) {
                            let objectPath = 'judges/' + fileName;
													$.ajax({
                                url: config.ajaxUrls.getUrlSignature,
                                type: 'GET',
                                data:{objectPath:objectPath},
                                success:function(res){
									console.log("=========",res);
                                    that.$Notice.success({title:'上传成功！'});
									that.imgUrl = res;
									that.fileName = fileName;
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
			console.log(this.dataSourse);
    		// var img = new Image();
    		// img.src = this.imgUrl;
    		// this.dataSourse.headicon = this.fileName;
    		// if(img.width  == img.height){
        	// 	var that = this;
        	// 	$.ajax({
        	//         url:that.submitUrl,
        	//         type:"post",
        	//         dataType:"json",
        	//         contentType :"application/json; charset=UTF-8",
        	//         data:JSON.stringify(that.dataSourse),
        	//         success:function(response){
        	//             if(response.success){
        	//                 if(that.redirectUrl){
        	//                 	that.$Notice.success({title:that.successMessage?that.successMessage:config.messages.optSuccRedirect});
        	//                     setTimeout(function(){
            // 	                    window.location.href=that.redirectUrl;
        	//                     },3000);
        	//                 }else{
        	//                 	that.$Notice.warning({title:that.successMessage?that.successMessage:config.messages.optSuccess});
        	//                 }
        	//             }else{
        	//             	that.$Notice.error({title:response.message});
        	//             }
        	//         },
        	//         error:function(){
        	//         	that.$Notice.error({title:config.messages.networkError});
        	//         }
        	//     });
    		// }else{
            // 	that.$Notice.error({title:"封面图尺寸有误！"});
    		// }
    	}
    }
})


function initClient(creds){
	var client = new OSS({
		region: region,
  		accessKeyId: creds.accessKeyId,
  		accessKeySecret: creds.accessKeySecret,
  		stsToken: creds.securityToken,
  		bucket: bucket
	});
	return client;
}

function multipartUpload(client, files, that, progress){
	var file = files.target.files[0];
	var fileName = files.target.files[0].name;
    var newFilename =  calculate_object_name(fileName);
	client.multipartUpload('judges/'+ newFilename, file,{
		progress: progress
	}).then(function (res) {
		var res = client.signatureUrl('judges/' + newFilename);
		that.imgUrl = res;
		that.fileName = newFilename;
	});
}
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
	let g_object_name = random_string(20) + suffix;

    return g_object_name;
}
