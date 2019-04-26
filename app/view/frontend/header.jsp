<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<div class="JMHeader">

	
	
	<div class="JMLogo">
		<a href=""><img alt="" src="resources/frontend/images/app/Logo.png"></a>
	</div>
	<div class="JMNoticeBoard">
		<div class="JMNoticeBoardLeft">
			<a href="login"><spring:message code="sign_up"/></a>
		</div>
		<div class="JMNoticeBoardRight">
			<div class="JMItem">
				<span id="countDown" class="countDown"></span>征稿剩余天数
			</div>
		</div>

	</div>
	
	<div class="JMTopNav">
		<ul class="JMMenu">
			<li class="JMItem"><a class="JMLink" href="judge/judge" data-page-name="judge">评委</a></li>
			<li class="JMItem"><a class="JMLink" href="rule/rules" data-page-name="rule">章程</a></li>
			<li class="JMItem"><a class="JMLink" href="news/news/1" data-page-name="news">新闻</a></li>
			<li class="JMItem"><a class="JMLink" href="index" data-page-name="index">首页</a></li>
		</ul>
<div>
		<a href="${pageContext.request.contextPath}/index?locale=zh" data-page-name="zh">中文</a>
        <a href="${pageContext.request.contextPath}/index?locale=en" data-page-name="en">英文</a>
	</div>
		<ul class="JMUserMenu">
			<c:if test="${!empty sessionScope.userId}">
				<li class="JMItem"><a href="production/works" class="JMLink JM20C7BE">[ ${sessionScope.realname} ]</a></li>
				<li class="JMItem"><a class="JMLink" href="logout"><spring:message code="logout"/><fmt:message key="logout"/></a></li>
			</c:if>
			<c:if test="${empty sessionScope.userId}">
				<li style="position: absolute;top: 15px;border-left: solid 2px #6d6d6d;height: 23px;"></li>
				<li class="JMItem" style="width: 33px;margin-left: 33px;margin-right: 30px;"><a class="JMLink JMIconUser" href="login"> </a></li>
			</c:if>
		</ul>

	</div>
	
</div>

