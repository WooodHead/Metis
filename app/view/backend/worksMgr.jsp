<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>

<%@ include file="../head.jsp"%>

<link href="resources/backend/css/lib/bootstrap.min.css" type="text/css" rel="stylesheet">
<link href="resources/backend/css/src/main.css" type="text/css" rel="stylesheet">
<!-- vue和iview引用文件 -->
<link rel="stylesheet" type="text/css" href="resources/css/lib/iview.css">
<script type="text/javascript" src="resources/js/lib/vue.min.js"></script>
<script type="text/javascript" src="resources/js/lib/iview.min.js"></script>
<script src="resources/js/lib/promise.js"></script>
<script type="text/javascript" src="resources/js/lib/aliyun-oss-sdk.min.js"></script>
</head>
<body>

	<%@ include file="header.jsp"%>

	<div class="left">
		<%@ include file="menu.jsp"%>
	</div>

	<div class="right">		
		<div class="worksMgr" v-cloak>
			<i-col span="24">作品管理</i-col>
			<div style="display:inline-block;margin-left:60px;">
				<label>组别：</label>
				<i-select v-model="groupModel" style="width:200px" @on-change="groupCheck">
			        <i-option v-for="Groupitem in GroupList" :value="Groupitem.value" :key="Groupitem.value" >{{ Groupitem.label }}</i-option>
			    </i-select>
			</div>
			<div style="display:inline-block;margin-left:60px;">
				<label>作品类型：</label>
				<i-select v-model="subGroupModel" style="width:200px" @on-change="subGroupCheck">
			        <i-option v-for="SubGroupitem in SubGroupList" :value="SubGroupitem.value" :key="SubGroupitem.value" >{{ SubGroupitem.label }}</i-option>
			    </i-select>
			</div>
			<div style="display:inline-block;margin-left:60px;">
				<label>评分轮次：</label>
				<i-select v-model="roundModel" style="width:200px" @on-change="roundCheck">
			        <i-option v-for="Rounditem in JudgeRoundList" :value="Rounditem.value" :key="Rounditem.value" >{{ Rounditem.label }}</i-option>
			    </i-select>
			</div>
			<div style="display:inline-block;margin-left:60px;">
			    <label>状态：</label>
				<i-select v-model="statusModel" style="width:200px" @on-change="statusCheck">
			        <i-option v-for="Statusitem in StatusList" :value="Statusitem.value" :key="Statusitem.value" >{{ Statusitem.label }}</i-option>
			    </i-select>
		    </div>
		    <i-table :columns="columns" :data="dataList" style="margin-top:20px;" ></i-table>
		    <i-table id="scoreTable" :columns="Scroecolumns" :data="RoundScroeList" style="width:200px;position:absolute;"></i-table>
		    <page v-model="totalPage" :current="1" :total="totalPage" @on-change="pageChange" show-total style="margin-right:60px;margin-top:20px;text-align:right;"></page>
		</div>
	</div>

	<%@ include file="loading.jsp"%>
	<script>
		var pageName = "works";
	</script>
	<script src="resources/js/lib/jquery-1.10.2.min.js"></script>
	<script src="resources/backend/js/lib/bootstrap.min.js"></script>
	<script src="resources/backend/js/src/config.js"></script>
	<script src="resources/backend/js/src/worksMgr.js"></script>

</body>
</html>
