<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="../head.jsp"%>
<link href="resources/backend/css/lib/bootstrap.min.css" type="text/css" rel="stylesheet">
<link href="resources/css/lib/jquery.toastmessage.css" type="text/css" rel="stylesheet">
<link href="resources/backend/css/src/main.css" type="text/css" rel="stylesheet">

<link rel="stylesheet" type="text/css" href="resources/css/lib/iview.css">
<script type="text/javascript" src="resources/js/lib/vue.min.js"></script>
<script type="text/javascript" src="resources/js/lib/iview.min.js"></script>

<script>
	var id = "${roundJudge.id}";
</script>
</head>
<body>

	<%@ include file="header.jsp"%>

	<div class="left">
		<%@ include file="menu.jsp"%>
	</div>

	<section class="right">
		
		
		
		<div class="judgeRoundCOU">
			<i-col span="24">新建/修改评审轮次</i-col>
			<div>
				<i-form :model="dataSourse" :rules="ruleDataSourse" :label-width="180" style="width:80%;" v-cloak>
					<form-item label="名称*" prop="roundName">
			            <i-input v-model="dataSourse.roundName"></i-input>
			        </form-item>
			        <form-item label="描述">
			            <i-input type="textarea" v-model="dataSourse.describes" :rows="6"></i-input>
			        </form-item>
			        <form-item>
			        	<i-button type="primary" v-on:click="submit" long>确定</i-button>
			        </form-item>
				 </i-form>
			</div>
		</div>
	</section>

	<%@ include file="loading.jsp"%>


	<script>
		var pageName = "judgeRound";
	</script>

	<script src="resources/js/lib/jquery-1.10.2.min.js"></script>
	<script src="resources/backend/js/lib/bootstrap.min.js"></script>
	<script src="resources/backend/js/src/config.js"></script>
	<script src="resources/backend/js/src/judgeRoundCOU.js"></script>

</body>
</html>