<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:directive.page import="java.util.Hashtable" />
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="../head.jsp"%>
<link href="resources/frontend/css/src/main.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/workDetail.css" type="text/css" rel="stylesheet">

<!-- vue和iview引用文件 -->
<link rel="stylesheet" type="text/css" href="resources/css/lib/iview.css">
<script type="text/javascript" src="resources/js/lib/vue.min.js"></script>
<script type="text/javascript" src="resources/js/lib/iview.min.js"></script>
<script src="resources/js/lib/promise.js"></script>
<script type="text/javascript" src="resources/js/lib/aliyun-oss-sdk.min.js"></script>
<script>
	var productionId = '${production.id}';
</script>
</head>
<body style="max-width:none;">
	<div class="workDetail" v-cloak>
			<h3 class="backTitle">{{title}}</h3>
			<span>{{participantName}}</span>
			<p class="backText">证件号码：{{participantIdNumber}}</p>
			<p class="backText">个人/团队 简介：{{participantBrief}}</p>
			<p class="backText">设计介绍：{{content}}</p>
			<div class="backText" v-show="attachFile">
				附件下载:&nbsp;&nbsp;<a :href="attachFileDownload" target="_blank">{{attachFile}}</a>
			</div>
			<div class="produceImg">
				<img :src="productImg_1" style="margin:10px auto;"/>
				<img :src="productImg_2" style="margin:10px auto;"/>
				<img :src="productImg_3" style="margin:10px auto;"/>
			</div>
		</div>
	<script>
		var pageName = "xxx";
	</script>
	<script src="resources/js/lib/jquery-1.10.2.min.js"></script>
	<script src="resources/js/lib/jquery.toastmessage.js"></script>
	<script src="resources/frontend/js/src/config.js"></script>
	<script src="resources/js/src/functions.js"></script>
	<script src="resources/frontend/js/src/workDetail.js"></script>
</body>
</html>