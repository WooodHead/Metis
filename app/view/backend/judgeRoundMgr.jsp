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
			<div class="judgeRoundMgr" v-cloak>
			<i-col span="24">评审轮次管理</i-col>
			<a class="btn btn-primary" href="roundJudge/judgeRoundCOU"> <span class="glyphicon glyphicon-plus"></span>新建</a>
			<i-table :columns="columns" :data="dataList" style="margin-top:20px;width:100%;" ></i-table>
		    <!-- <page v-model="totalPage" :total="totalPage" @on-change="pageChange" show-total style="margin-right:60px;margin-top:20px;text-align:right;"></page> -->
			<modal v-model="setModal" @on-ok="ok" @on-cancel="cancel">
		        <p slot="header" style="color:#f60;text-align:center">
		            <i-con type="information-circled"></Icon>
		            <span>{{roundTitle}}</span>
		        </p>
		        <checkbox :indeterminate="indeterminate" v-model="checkAll" @click.prevent.native="handleCheckAll">全选</checkbox>
	            <checkbox-group v-model="checkAllGroup[index]" @on-change="checkAllGroupChange" v-for="item in judgeList">
			        <checkbox :label="item.name"></checkbox>
			    </checkbox-group>
		    </modal>
		    <modal v-model="deleteModal" @on-ok="deleteOK" title="警告！！！">
		        <p style="color:#ed3f14;text-align:center">
		            <Icon type="information-circled"></Icon>
		            <span>确定删除评审轮次:{{judgeRoundTitle}}？</span>
		        </p>
		    </modal>
		</div>
	</div>

	<%@ include file="loading.jsp"%>

	<script>
		var pageName = "judgeRound";
	</script>
	<script src="resources/js/lib/jquery-1.10.2.min.js"></script>
	<script src="resources/backend/js/lib/bootstrap.min.js"></script>
	<script src="resources/backend/js/src/config.js"></script>
	<script src="resources/backend/js/src/judgeRoundMgr.js"></script>

</body>
</html>
