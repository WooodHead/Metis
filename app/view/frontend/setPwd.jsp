<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html>
<head>

<%@ include file="../head.jsp"%>

<link href="resources/css/lib/jquery.toastmessage.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/Header.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/setPwd.css" type="text/css" rel="stylesheet">

<!-- vue和iview引用文件 -->
<link rel="stylesheet" type="text/css" href="resources/css/lib/iview.css">
<script type="text/javascript" src="resources/js/lib/vue.min.js"></script>
<script type="text/javascript" src="resources/js/lib/iview.min.js"></script>
<script>
	var code = '${resultModel.object}';
</script>
</head>

<body>

	<%@ include file="header.jsp"%>

	<c:if test="${resultModel.success != true}">
            ${resultModel.message}
        </c:if>

	<c:if test="${resultModel.success == true}">
		
		<div class="setPwd" v-cloak>
			<i-form ref="formItem" :model="formItem" :label-width="100" :rules="ruleValidate">
				<form-item label="邮箱" prop="email">
		            <i-input type="email" v-model="formItem.email" placeholder="请输入邮箱"></i-input>
		        </form-item>
		        <form-item label="新密码" prop="newPwd">
		            <i-input type="password" v-model="formItem.newPwd" placeholder="请输入密码"></i-input>
		        </form-item>
		        <form-item label="确认密码" prop="confirmPwd">
		            <i-input type="password" v-model="formItem.confirmPwd" @on-blur="conPwdBlur" placeholder="请重新输入密码"></i-input>
		        </form-item>
		        <form-item>
		            <i-button type="primary" long @click="submit">提交</i-button>
		        </form-item>
		    </i-form>
		</div>
	</c:if>

	<%@ include file="loading.jsp"%>

	<script>
		var pageName = "setPwd";
	</script>

	<script src="resources/js/lib/jquery-1.10.2.min.js"></script>
	<script src="resources/frontend/js/src/config.js"></script>
	<script src="resources/frontend/js/src/setPwd.js"></script>
	<script src="resources/frontend/js/src/header.js"></script>
</body>
</html>