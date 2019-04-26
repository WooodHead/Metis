<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html>
<head>

<%@ include file="../head.jsp"%>


<link href="resources/css/lib/jquery.toastmessage.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/main.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/Header.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/pageMenu.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/resetInfo.css" type="text/css" rel="stylesheet">

<!-- vue和iview引用文件 -->
<link rel="stylesheet" type="text/css" href="resources/css/lib/iview.css">
<script type="text/javascript" src="resources/js/lib/vue.min.js"></script>
<script type="text/javascript" src="resources/js/lib/iview.min.js"></script>

<script>
	var realname = "${user.realname}";
	var mobile = "${user.mobile}";
	var address = "${user.address}";
</script>
</head>
<body style="max-width:none;">

	<%@ include file="header.jsp"%>
	<%@ include file="pageMenu.jsp"%>
	
	<div class="resetInfo" :style="resetInfoStyle" v-cloak>
		<h2>基本信息</h2>
		<i-form :model="formInfo" :label-width="100" :rules="ruleDataSourse">
		   <form-item label="用户名" prop="realname">
	           <i-input v-model="formInfo.realname" name="realname" placeholder="请输入用户名" clearable></i-input>
	       </form-item>
	       <form-item label="手机号" prop="mobile">
	           <i-input v-model="formInfo.mobile" name="mobile" placeholder="请输入手机号" clearable></i-input>
	       </form-item>
	       <form-item label="地址" prop="address">
	           <i-input v-model="formInfo.address" name="address" placeholder="请输入地址" clearable></i-input>
	       </form-item>
	       <form-item>
	            <i-button type="primary" long @click="submitInfo">保存</i-button>
	        </form-item>
	   </i-form>
	   <br/><br/><br/>
	   <i-form :model="formPwd" :label-width="100" :rules="ruleDataSourse">
			<h2 class="JMPanelTitle">密码</h2>
		   	<form-item label="新密码" prop="password">
	           	<i-input v-model="formPwd.password" name="password" type="password" placeholder="请输入新密码" clearable></i-input>
	       	</form-item>
	       	<form-item label="确认新密码" prop="confirmPwd">
	           	<i-input v-model="formPwd.confirmPwd" name="confirmPwd" type="password" placeholder="请重新输入新密码" clearable @on-blur="checkPwd"></i-input>
	           	<span style="color:#ed3f14;" v-if="showPwdError">两次输入密码不一致，请重新输入！</span>
	       	</form-item>
	       	<form-item>
	            <i-button type="primary" long @click="submitPwd">保存</i-button>
	        </form-item>
	   </i-form>
	</div>

	<%@ include file="footer.jsp"%>
	<script>
		var pageName = "setting";
	</script>
	<script src="resources/js/lib/jquery-1.10.2.min.js"></script>
	<script src="resources/js/lib/jquery.toastmessage.js"></script>
	<script src="resources/js/lib/jquery.serialize-object.min.js"></script>
	<script src="resources/js/lib/jquery.form.js"></script>
	<script src="resources/js/lib/jquery.validate.min.js"></script>
	<script src="resources/frontend/js/src/config.js"></script>
	<script src="resources/js/src/functions.js"></script>
	<script src="resources/js/src/ZYFormHandler.js"></script>
	<script src="resources/frontend/js/src/resetInfo.js"></script>
	<script src="resources/frontend/js/src/header.js"></script>
</body>
</html>