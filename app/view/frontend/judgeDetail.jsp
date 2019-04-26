<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<%@ include file="../head.jsp"%>
<link href="resources/frontend/css/src/JMCSS/Header.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/judgeDetail.css" type="text/css" rel="stylesheet">

<!-- vue和iview引用文件 -->
<link rel="stylesheet" type="text/css" href="resources/css/lib/iview.css">
<script type="text/javascript" src="resources/js/lib/vue.min.js"></script>
<script type="text/javascript" src="resources/js/lib/iview.min.js"></script>
<script src="resources/js/lib/promise.js"></script>
<script type="text/javascript" src="resources/js/lib/aliyun-oss-sdk.min.js"></script>

</head>
<body>

	<%@ include file="header.jsp"%>
	<div class="judgeDetail" :style="judgeDetailStyle" v-cloak>
		<row type="flex" justify="center">
	        <i-col span="3">
				<img class="zyThumb" :src="judgeHeadicon">
			</i-col>
			<i-col span="7">
				<label class="zyTip">{{name}}</label>
				<div class="description">{{description}}</div>
			</i-col>
	    </row>
	</div>

	<%@ include file="footer.jsp"%>


	<script>
		var pageName = "judge";
	</script>
	<script src="resources/js/lib/jquery-1.10.2.min.js"></script>
	<script src="resources/frontend/js/src/config.js"></script>
	<script src="resources/frontend/js/src/header.js"></script>
	
	<script>
		'use strict';
		
		var appServer = 'http://localhost:8080/dcpro/sigUploadKey/1';
		var bucket = 'dc-sys-pro';
		var region = 'oss-cn-hangzhou';
	
		var urllib = OSS.urllib;
		var Buffer = OSS.Buffer;
		var OSS = OSS.Wrapper;
		var STS = OSS.STS;
		var judgeDetail = new Vue({
			el:".judgeDetail",
			data:function(){
				return{
					judgeDetailStyle:{
						minHeight:"",
					  	marginTop: config.cssHeight.headHeight + "px",
					  	paddingTop:"60px"
					},
					language:"0",
					name:"",
					subTitle:"",
					description:"",
					judgeHeadicon:""
				}
			},
			created:function(){
				var that = this;
				this.judgeDetailStyle.minHeight = document.documentElement.clientHeight - config.cssHeight.headHeight - config.cssHeight.footHeight + "px";
       	  	 	var Id = window.location.href.split("judge/judgeDetail/")[1];
       	  		var url = config.ajaxUrls.judgeDetail.replace(":id",Id);
       	  		console.log(url);
	       	  	$.ajax({
	                "dataType":'json',
	                "type":"GET",
	                "url":url,
	                "success": function (res) {
	                	console.log(res);
	                    if(res.success===false){
	                    	that.$Notice.error({title:res.message});
	                    }else{
	                    	that.language = res.language;
	                    	if(res.language == "0"){
	                    		console.log("111111111");
	                    		that.name = res.object.name;
	                    		that.subTitle = res.object.subTitle;
	                    		that.description = res.object.description;
	                    	}else {
	                    		console.log("2322222");
	                    		that.name = res.object.enName;
	                    		that.subTitle = res.object.enSubTitle;
	                    		that.description = res.object.enDescription;
	                    	}
	            	  		that.judgeHeadicon = res.object.headicon;
	                    }
	                }
	            });
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
	</script>
	
</body>
</html>