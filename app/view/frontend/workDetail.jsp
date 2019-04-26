<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:directive.page import="java.util.Hashtable" />
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<%@ include file="../head.jsp"%>
<!-- <link href="resources/frontend/css/src/main.css" type="text/css" rel="stylesheet"> -->
<link href="resources/frontend/css/src/JMCSS/Header.css" type="text/css" rel="stylesheet">
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
<body  style="max-width:none;">
	<%@ include file="header.jsp"%>

	<div class="workDetail" v-cloak>
		<h2 class="title">标题：{{title}}</h2>
		<p class="content">简介：{{content}}</p>
		<div class="attachFile" v-show="attachFile">
			附件下载:&nbsp;&nbsp;<a :href="attachFileDownload" target="_blank">{{attachFile}}</a>
		</div>
		<div class="produceImg">
			<img :src="productImg_1" />
			<img :src="productImg_2" />
			<img :src="productImg_3" />
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
	<script src="resources/frontend/js/src/header.js"></script>
</body>
</html>