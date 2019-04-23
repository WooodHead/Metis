'use strict';

var bucket = 'dc-metis';
var urllib = OSS.urllib;
var Buffer = OSS.Buffer;
var OSS = OSS.Wrapper;
var STS = OSS.STS;

var uploadWork = new Vue({
	el:".uploadWork",
	data:function(){
		return{
			current:0,
			step:"1",						//控制到了第几步
			participantNameLabel:"姓名",
			participantIdNumberText:"身份证或护照号",
			idNamePlaceholder:"请输入身份证或护照号",
			formItem:{
				participantType:"1",		//参与者类型
				participantName:"",			//参与者姓名
				participantIdNumber:"",		//身份证号码
				participantBrief:"",		//个人简介
				affiliatedUnit:"",			//所属单位---选择公司时隐藏
				teamMember:"",				//队员姓名---选择团队时显示

				title:"",					//作品标题
				title_en:"",				//作品英文标题
				content:"",					//作品内容
				content_en:"",				//作品英文标题
				adviser:"",					//指导老师
				groupNum:"1",				//组别
				subGroupNum:"1",			//作品类型
				pimage:"",					//作品图片(多作品用逗号连接)
				status:"1",
				attachFile:""
			},
			ruleformItem:{
				participantName:[
	                 {required: true, message: '请输入参赛人或单位', trigger: 'blur'}
	            ],
				participantIdNumber:[{ required: true, message: '此项不能为空', trigger: 'blur' }],
				participantBrief:[{ required: true, message: '此项不能为空', trigger: 'blur' }],
				title:[{ required: true, message: '此项不能为空', trigger: 'blur' }],
				title_en:[{ required: true, message: '此项不能为空', trigger: 'blur' }],
				content:[{ required: true, message: '此项不能为空', trigger: 'blur' }],
				content_en:[{ required: true, message: '此项不能为空', trigger: 'blur' }],
				fileName_1:[{ required: true, message: '此项不能为空', trigger: 'blur' }]
			},
			uploadWorkStyle:{
				marginTop:"30px",
				minHeight:""
			},
			fileName_1:"",	//上传文件名称参数（测试）
			imgUrl_1:"",
			progressPercent_1:0,
			fileName_2:"",	//上传文件名称参数（测试）
			imgUrl_2:"",
			progressPercent_2:0,
			fileName_3:"",	//上传文件名称参数（测试）
			imgUrl_3:"",
			progressPercent_3:0,

			attachFilePercent:0,

			submitUrl:config.ajaxUrls.workCreate,
			redirectUrl: config.viewUrls.works
		}
	},
	methods:{
		userInfoChange: function (value) {
            if(value == 1){				//个人
            	this.participantNameLabel = "姓名";
            	this.participantIdNumberText = "证件号";
            	this.idNamePlaceholder = "请输入身份证或护照号";
            }else if(value == 2){			//团队
            	this.participantNameLabel = "队长姓名";
            	this.participantIdNumberText = "队长证件号";
            	this.idNamePlaceholder = "请输入队长身份证或护照号";
            }else{							//公司
            	this.participantNameLabel = "公司名称";
            	this.participantIdNumberText = "营业执照号";
            	this.idNamePlaceholder = "请输入公司营业执照号";
            }
        },
        goStep1:function(){
        	this.step = "1";
        	this.current = 0;
        },
        goStep2:function(){
        	if(this.formItem.participantName && this.formItem.participantIdNumber  && this.formItem.participantBrief){
            	this.step = "2";
            	this.current = 1;
        	}else{
        		this.$Notice.error({title:"请输入参赛者信息"});
        	}
        },
        goStep3:function(){
        	if(this.formItem.title && this.formItem.content){
            	this.step = "3";
            	this.current = 2;
        	}else{
        		this.$Notice.error({title:"请输入作品信息"});
        	}
        },
        //上传第一件作品
        doUpload_1:function(files){
			let that = this;
            let file = files.target.files[0];
            let fileName = calculate_object_name(files.target.files[0].name);
            this.$Notice.success({title:'上传中···'});
			$.ajax({
                url: config.ajaxUrls.getSTSSignature.replace(':fileType',config.uploader.fileType.productPath),
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
                        client.multipartUpload('product/'+ fileName, file, {
                    		progress: progress1
                    	}).then(function (res) {
                            let objectPath = 'product/' + fileName;
							$.ajax({
                                url: config.ajaxUrls.getUrlSignature,
                                type: 'GET',
                                data:{objectPath:objectPath},
                                success:function(res){
									that.$Notice.success({title:'上传成功！'});
									that.imgUrl_1 = res;
			        				that.fileName_1 = fileName;
									console.log(res,that.imgUrl_1,that.fileName_1);
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
        doUpload_2:function(files){
        	if(this.fileName_1){
				let that = this;
	            let file = files.target.files[0];
	            let fileName = calculate_object_name(files.target.files[0].name);
	            this.$Notice.success({title:'上传中···'});
				$.ajax({
	                url: config.ajaxUrls.getSTSSignature.replace(':fileType',config.uploader.fileType.productPath),
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
	                        client.multipartUpload('product/'+ fileName, file, {
	                    		progress: progress2
	                    	}).then(function (res) {
	                            let objectPath = 'product/' + fileName;
								$.ajax({
	                                url: config.ajaxUrls.getUrlSignature,
	                                type: 'GET',
	                                data:{objectPath:objectPath},
	                                success:function(res){
										that.$Notice.success({title:'上传成功！'});
										that.imgUrl_2 = res;
				        				that.fileName_2 = fileName;
										console.log(res,that.imgUrl_1,that.fileName_1);
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
        	}else{
        		this.$Notice.error({title:"请按照正常顺序上传作品"});
        	}
        },
        doUpload_3:function(files){
        	if(this.fileName_2){
				let that = this;
	            let file = files.target.files[0];
	            let fileName = calculate_object_name(files.target.files[0].name);
	            this.$Notice.success({title:'上传中···'});
				$.ajax({
	                url: config.ajaxUrls.getSTSSignature.replace(':fileType',config.uploader.fileType.productPath),
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
	                        client.multipartUpload('product/'+ fileName, file, {
	                    		progress: progress3
	                    	}).then(function (res) {
	                            let objectPath = 'product/' + fileName;
								$.ajax({
	                                url: config.ajaxUrls.getUrlSignature,
	                                type: 'GET',
	                                data:{objectPath:objectPath},
	                                success:function(res){
										that.$Notice.success({title:'上传成功！'});
										that.imgUrl_3 = res;
				        				that.fileName_3 = fileName;
										console.log(res,that.imgUrl_1,that.fileName_1);
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
        	}else{
        		this.$Notice.error({title:"请按照正常顺序上传作品"});
        	}
        },
		step2_upload_ZIP_change(files){
			let that = this;
			let file = files.target.files[0];
			let fileName = calculate_object_name(files.target.files[0].name);
			this.$Notice.success({title:'上传中···'});
            $.ajax({
                url:config.ajaxUrls.getSTSSignature.replace(':fileType',config.uploader.fileType.attachmentPath),
                type: 'GET',
                success:function(res){
                    if (res.res.status == 200) {
                        let client = new OSS({
                      		accessKeyId: res.credentials.AccessKeyId,
                      		accessKeySecret: res.credentials.AccessKeySecret,
                      		stsToken: res.credentials.SecurityToken,
                            bucket:bucket
                    	});
                        client.multipartUpload('attachment/'+ fileName, file, {
                    		progress: attachFilePercent
                    	}).then(function (res) {
							console.log(res);
                            that.$Notice.success({title:'上传成功！'});
							that.formItem.attachFile = fileName;
                    	});
                    } else {
                        that.$Notice.error({
                            title:"上传出现异常，请刷新界面重试！"
                        })
                    }
                }
            })
        },
        submit:function(){
        	var that = this;
        	pimageConcat(this);
    		this.$Loading.start();
        	$.ajax({
                url:this.submitUrl,
                type:"POST",
                dataType:"json",
                contentType :"application/json; charset=UTF-8",
                data:JSON.stringify(this.formItem),
                success:function(res){
                    if(res.success){
                        if(that.redirectUrl){
                        	that.$Notice.success({ title: config.messages.optSuccRedirect,duration:3,
                            	onClose:function(){
                            		that.$Loading.finish();
                                	window.location.href = that.redirectUrl;
                                }
                            });
                        }
                    }else{
                    	that.$Loading.error();
                    	that.$Notice.error({ title: res.message,duration:3});
                    }
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){
                	if(textStatus == "parsererror"){
                   	 that.$Loading.error();
                   	 that.$Notice.error({ title: "登陆会话超时，请重新登陆",duration:3});
                    }
                }
            });
        }
	},
	created:function(){
		this.uploadWorkStyle.minHeight = document.documentElement.clientHeight - config.cssHeight.headHeight - config.cssHeight.footHeight - 110 + "px";
		var that = this;
		let id =  window.location.href.split("uploadWork/")[1];
	    if (id > 0) {
	        this.submitUrl = config.ajaxUrls.workUpdate;
	        $.ajax({
	        	url:config.ajaxUrls.workDetail.replace(":id", id),
	        	type:"GET",
	        	success:function(res){
	        		that.formItem = res.object;
	        		that.formItem.participantType = res.object.participantType.toString();
	        		that.formItem.groupNum = res.object.groupNum.toString();
	        		that.formItem.subGroupNum = res.object.subGroupNum.toString();
	        		if(res.object.attachFile){
	        			that.attachFilePercent = 100;
	        		}
	        		var pimageArr = res.object.pimage.split(",");
	            	 initProductImg(pimageArr,that);
	        	}
	        })
	    }else{

		}
	}
})
var attachUrl = "";
$(document).ready(function(){
	$('#step2_upload_ZIP_btn').click(function(){
        $('#step2_upload_ZIP_btninput').click();
    });


	//
	// var uploader = new plupload.Uploader({
    //     browse_button : 'browse', //触发文件选择对话框的按钮，为那个元素id
    //     url : config.ajaxUrls.attachUpload, //服务器端的上传页面地址
    //     multi_selection:false,
    //     filters:{
    //     	mime_types : [{ title : "Zip files", extensions : "zip,rar" }],
    //     	max_file_size : '100mb',
    //     	prevent_duplicates : true
    //     },
    //     multipart_params:{	//上传的参数
    //     	fileType:1,
    //     	file:[]
    //     }
    // });
	//
    // uploader.init();
	//
    // uploader.bind('FilesAdded',function(uploader,files){
    // 	uploadWork.$Notice.success({title:"已添加文件，确认无误请上传"});
    // });
	//
    // uploader.bind('UploadProgress',function(uploader,file){
    // 	uploadWork.attachFilePercent = file.percent;
    // })
	//
    // uploader.bind('FileUploaded',function(up, file, info){
    // 	uploadWork.$Notice.success({title:config.messages.uploaded});
    // 	$("#zyFormAttachTitle").html(file.name);
    // 	uploadWork.formItem.attachFile = JSON.parse(info.response).object;
    // });
	//
    // uploader.bind('Error',function(uploader,file){
    // 	uploadWork.$Notice.error({title:config.messages.uploadIOError});
    // });
    // //最后给"开始上传"按钮注册事件
    // document.getElementById('upload-btn').onclick = function(){
    //     uploader.start();
    // }
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
function initProductImg(pimageArr,that){
	if(pimageArr[0]){
		that.imgUrl_1 = pimageArr[0];
		that.fileName_1 = pimageArr[0];
		that.progressPercent_1 = 100;
	}
	if(pimageArr[1]){
		that.imgUrl_2 = pimageArr[1];
		that.fileName_2 = pimageArr[1];
		that.progressPercent_2 = 100;
	}
	if(pimageArr[2]){
		that.imgUrl_3 = pimageArr[2];
		that.fileName_3 = pimageArr[2];
		that.progressPercent_3 = 100;
	}
}
function multipartUpload(client, files, that, progress, p){
	var file = files.target.files[0];
	var fileName = files.target.files[0].name;
	calculate_object_name(fileName);
    var newFilename =  g_object_name;
	client.multipartUpload('product/'+ newFilename, file,{
		progress: progress
	}).then(function (res) {
		$.ajax({
			url:"oss/getSignUrl",
			data:{
				filename:newFilename,
				type:"1"
			},
        	type:"GET",
        	success:function(res){
        		if(res.resultCode == 200){
        			var res = res.object;
        			if(p == 'p1'){
        				that.imgUrl_1 = res;
        				that.fileName_1 = newFilename;
        			}else if(p =='p2'){
        				that.imgUrl_2 = res;
        				that.fileName_2 = newFilename;
        			}else if(p =='p3'){
        				that.imgUrl_3 = res;
        				that.fileName_3 = newFilename;
        			}
        		}
        	}
		})

	});
}
var progress1 = function (p) {
	return function (done) {
		uploadWork.progressPercent_1 = p * 100;
		done();
	}
};

var progress2 = function (p) {
	return function (done) {
		uploadWork.progressPercent_2 = p * 100;
		done();
	}
};

var progress3 = function (p) {
	return function (done) {
		uploadWork.progressPercent_3 = p * 100;
		done();
	}
};

var attachFilePercent = function (p) {
	return function (done) {
		uploadWork.attachFilePercent = p * 100;
		done();
	}
};

function pimageConcat(that){
	var pimage_1 = "",pimage_2 = "",pimage_3 = "";
	var arr = [];
	if(that.fileName_1){
		if(that.fileName_1.indexOf("?") >= 0){
			pimage_1 = that.fileName_1.split("product/")[1].split("?")[0];
			arr = arr.concat(pimage_1);
		}else{
			pimage_1 = that.fileName_1;
			arr = arr.concat(pimage_1);
		}
	}
	if(that.fileName_2){
		if(that.fileName_2.indexOf("?") >= 0){
			pimage_2 = that.fileName_2.split("product/")[1].split("?")[0];
			arr = arr.concat(pimage_2);
		}else{
			pimage_2 = that.fileName_2;
			arr = arr.concat(pimage_2);
		}
	}
	if(that.fileName_3){
		if(that.fileName_3.indexOf("?") >= 0){
			pimage_3 = that.fileName_3.split("product/")[1].split("?")[0];
			arr = arr.concat(pimage_3);
		}else{
			pimage_3 = that.fileName_3;
			arr = arr.concat(pimage_3);
		}
	}
	that.formItem.pimage = arr.join(",");
}

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
