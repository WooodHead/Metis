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
</head>
<body>

	<%@ include file="header.jsp"%>

	<div class="left">
		<%@ include file="menu.jsp"%>
	</div>

	<section class="right">
		<article class="sendEmail" >
			<i-col span="24">评审管理</i-col>
			 <i-form :model="formItem" :label-width="180" style="width:80%;" id="myForm" v-cloak>
				<form-item label="轮次*">
					<i-select :value="roundModel" @on-change="roundCheck" >
				        <i-option v-for="Rounditem in JudgeRoundList" :value="Rounditem.id" :label="Rounditem.roundName"></i-option>
				    </i-select>
				</form-item>
		         <form-item label="邮件描述*">
		            <textarea v-model="dataSourse.emailContent" name="emailContent" id="emailContent">{{dataSourse.content}}</textarea>
		        </form-item>
		        <form-item label="测试邮箱">
		            <i-input v-model="dataSourse.email" name="email"></i-input>
		            <label style="color:red">由于邮件发送为异步发送，为了检测这批邮件是否发送成功，可以添加您自己的邮箱一起发送，如果您收到邮件，则表示群发是成功的！</label>
		        </form-item>
		        <form-item>
		        	<i-button type="primary" v-on:click="submit"  long>确定</i-button>
		        </form-item>
		    </i-form>
		</article>
	</section>

	<%@ include file="loading.jsp"%>


	<script>
		var pageName = "sendEmail";
	</script>

	<script src="resources/js/lib/jquery-1.10.2.min.js"></script>
	<!-- <script src="resources/js/lib/jquery.toastmessage.js"></script> -->
	<script src="resources/js/lib/plupload.full.min.js"></script>
	<script src="resources/js/lib/jquery.form.js"></script>
	<!-- <script src="resources/js/lib/jquery.validate.min.js"></script> -->
	<script src="resources/backend/js/lib/bootstrap.min.js"></script>
	<script src="resources/backend/js/src/config.js"></script>
	<script src="resources/backend/js/lib/tinyMCE/tinymce.min.js"></script>
	<!-- <script src="resources/js/src/functions.js"></script>
	<script src="resources/js/src/ZYFormHandler.js"></script> -->
	<script src="resources/backend/js/src/sendEmail.js"></script>

</body>
</html>