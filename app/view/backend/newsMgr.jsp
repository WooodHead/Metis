<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>

<%@ include file="../head.jsp"%>

<link href="resources/backend/css/lib/bootstrap.min.css" type="text/css" rel="stylesheet">
<link href="resources/backend/css/lib/jquery.dataTables.css" type="text/css" rel="stylesheet">
<link href="resources/css/lib/jquery.toastmessage.css" type="text/css" rel="stylesheet">
<link href="resources/backend/css/src/main.css" type="text/css" rel="stylesheet">
<!-- vue和iview引用文件 -->
<link rel="stylesheet" type="text/css" href="resources/css/lib/iview.css">
<script type="text/javascript" src="resources/js/lib/vue.min.js"></script>
<script type="text/javascript" src="resources/js/lib/iview.min.js"></script>
</head>
<body>

	<%@ include file="header.jsp"%>

	<div class="left">
		<%@ include file="menu.jsp"%>
	</div>

	<div class="right">
		<!-- 采用iview插件 -->
		<div class="newsMgr" v-cloak>
	        <i-col span="24">新闻</i-col>
	        <modal v-model="deleteModal" @on-ok="ok" title="警告！！！">
		        <p style="color:#ed3f14;text-align:center">
		            <Icon type="information-circled"></Icon>
		            <span style="font-size: 15px;">确定删除新闻:{{newsTitle}}?</span>
		        </p>
		    </modal>
			<!-- <i-button type="primary" icon="plus" @click="createNews">新建</i-button> -->
			<a class="btn btn-primary" href="news/newsCOU"> <span class="glyphicon glyphicon-plus"></span>新建</a>
			<i-table :columns="columns" :data="dataList" style="margin-top:20px;"></i-table>
			<page v-model="totalPage" :current="1" :total="totalPage" @on-change="pageChange" show-total style="margin-right:60px;margin-top:20px;text-align:right;"></page>
		</div>
		
		
		
	</div>


	<%@ include file="loading.jsp"%>

	<script>
		var pageName = "news";
	</script>
	<script src="resources/js/lib/jquery-1.10.2.min.js"></script>
	<script src="resources/backend/js/lib/bootstrap.min.js"></script>
	<script src="resources/backend/js/src/config.js"></script>
	<!-- iview插件生成的js文件 -->
	<script src="resources/backend/js/src/newsMgr.js"></script>
	
	
</body>
</html>
