<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<%@ include file="../head.jsp"%>

<link href="resources/css/lib/jquery.toastmessage.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/Header.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/forgetPwd.css" type="text/css" rel="stylesheet">

<!-- vue和iview引用文件 -->
<link rel="stylesheet" type="text/css" href="resources/css/lib/iview.css">
<script type="text/javascript" src="resources/js/lib/vue.min.js"></script>
<script type="text/javascript" src="resources/js/lib/iview.min.js"></script>
</head>
<body style="max-width:none;">
	<%@ include file="header.jsp"%>
	
	<div class="forgetPwd" :style="forgetPwdStyle" v-cloak>
		<i-form ref="formItem" :model="formItem" :label-width="100" :rules="ruleValidate">
			<form-item label="找回密码方式">
		        <radio-group v-model="formItem.mobileOrEmail" type="button" @on-change="radioChange">
			        <radio label="1" value="1">短信验证</radio>
			        <radio label="0" value="0">邮箱验证</radio>
			    </radio-group>
	        </form-item>
			<form-item label="邮箱" prop="email" v-if="formItem.mobileOrEmail == 0">
	            <i-input type="email" v-model="formItem.email" placeholder="请输入邮箱"></i-input>
	        </form-item>
	        <form-item label="验证码" prop="rand" v-if="formItem.mobileOrEmail == 0">
	            <i-input type="text" v-model="formItem.rand" style="width:200px;" placeholder="请重新图片验证码"></i-input>
	            <img src="user/getCode" class="zyActiveCode" style="display: inline-block; vertical-align: middle; height: 32px; width: auto;">
	        </form-item>
	        <form-item v-if="formItem.mobileOrEmail == 0">
	            <i-button type="primary" long @click="sendEmail">提交</i-button>
	        </form-item>
	        <form-item label="手机号" prop="mobile" v-if="formItem.mobileOrEmail == 1">
	            <i-input type="text" v-model="formItem.mobile" placeholder="请输入邮箱"></i-input>
	        </form-item>
	        <form-item label="短信验证码" prop="mobileCode" v-if="formItem.mobileOrEmail == 1">
	            <i-input type="text" v-model="formItem.mobileCode" @on-change="checkMobileCode" style="width:200px;" placeholder="请重新图片验证码"></i-input>
	            <i-button type="default" :disabled="disableBtn" @click="sendAcodeStg">{{mobileCodeText}}</i-button>
	        </form-item>
	        <form-item label="密码" prop="password" v-if="lock">
	            <i-input type="password" v-model="formItem.password" placeholder="请输入密码"></i-input>
	        </form-item>
	        <form-item label="确认密码" prop="confirmPassword"  v-if="lock">
	            <i-input type="password" v-model="formItem.confirmPassword" @on-blur="conPwdBlur" placeholder="请重新输入密码"></i-input>
	        </form-item>
	        <form-item v-if="formItem.mobileOrEmail == 1">
	            <i-button type="primary" :disabled="disableSbt" long @click="changePwd">提交</i-button>
	        </form-item>
	    </i-form>
	</div>
	<%@ include file="footer.jsp"%>

	<script>
		var pageName = "forgetPwd";
	</script>

	<script src="resources/js/lib/jquery-1.10.2.min.js"></script>
	<script src="resources/js/lib/jquery.toastmessage.js"></script>
	<script src="resources/js/lib/jquery.form.js"></script>
	<script src="resources/js/lib/jquery.validate.min.js"></script>
	<script src="resources/frontend/js/src/config.js"></script>
	<script src="resources/js/src/functions.js"></script>
	<script src="resources/js/src/ZYFormHandler.js"></script>
	<script src="resources/frontend/js/src/forgetPwd.js"></script>
	<script src="resources/frontend/js/src/header.js"></script>
</body>
</html>