<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<!DOCTYPE html>
<html>
<head>

<%@ include file="../head.jsp"%>

<link href="resources/frontend/css/src/JMCSS/Header.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/newsDetail.css" type="text/css" rel="stylesheet">

<!-- vue和iview引用文件 -->
<link rel="stylesheet" type="text/css" href="resources/css/lib/iview.css">
<script type="text/javascript" src="resources/js/lib/vue.min.js"></script>
<script type="text/javascript" src="resources/js/lib/iview.min.js"></script>
</head>
<body>
	<%@ include file="header.jsp"%>
	<div class="newsDetail" :style="newsDetailStyle">
		<row>
		    <i-col span="14" push="5">
				<h3 class="zyTitle">${news.title}</h3>
				<p class="zyDate">${fn:substring(news.publishTime, 0, 10)}</p>
				<div class="zyContent">${news.content.replace('../../','')}</div>
			</i-col>
		</row>
	</div>
	<%@ include file="footer.jsp"%>

	<script>
		var pageName = "news";
	</script>
	<script src="resources/js/lib/jquery-1.10.2.min.js"></script>
	<script src="resources/frontend/js/src/config.js"></script>
	<script src="resources/frontend/js/src/header.js"></script>
	
	<script type="text/javascript">
		var newsDetail = new Vue({
			el:".newsDetail",
			data:function(){
				return{
					newsDetailStyle:{
						marginTop:config.cssHeight.headHeight + "px",
						minHeight:""
					}
				}
			},
			created:function(){
				this.newsDetailStyle.minHeight = document.documentElement.clientHeight - config.cssHeight.headHeight - config.cssHeight.footHeight + "px";
			}
		})
	</script>
</body>
</html>