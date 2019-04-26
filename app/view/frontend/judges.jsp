<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<!DOCTYPE html>
<html>
<head>
<%@ include file="../head.jsp"%>
<link href="resources/frontend/css/src/JMCSS/Header.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/Judge.css" type="text/css" rel="stylesheet">

<!-- vue和iview引用文件 -->
<link rel="stylesheet" type="text/css" href="resources/css/lib/iview.css">
<script type="text/javascript" src="resources/js/lib/vue.min.js"></script>
<script type="text/javascript" src="resources/js/lib/iview.min.js"></script>
<script src="resources/js/lib/promise.js"></script>
<script type="text/javascript" src="resources/js/lib/aliyun-oss-sdk.min.js"></script>
</head>
<body>
	<%@ include file="header.jsp"%>
	<div id="judge" class="JMJudge" v-cloak :style="judgeStyle">
		<row>
	      <i-col span="14" push="5">
				<ul class="JMList2">
				   <li class="JMItem" v-for="item in dataList">
				   	<a class="JMLink" :href="'judge/judgeDetail/' + item.id"> <img class="JMThumb" :src="item.headicon">
							<div class="JMInfo">
								<h3 class="JMTitle">{{language == "0" ? item.name : item.enName}}</h3>
								<div class="JMExcerpt">{{language == "0" ?item.subTitle : item.enSubTitle}}</div>
							</div>
							<hr class="JMJudgeLine">
						</a>
					</li>
				</ul>
			</i-col>
	    </row>
	</div>
	
	<%@ include file="footer.jsp"%>
	<script>
		var pageName = "judge";
	</script>
	<script src="resources/js/lib/jquery-1.10.2.min.js"></script>
	<script src="resources/frontend/js/src/config.js"></script>
	<script src="resources/frontend/js/src/header.js"></script>
	<script src="resources/frontend/js/src/judges.js"></script>
</body>
</html>