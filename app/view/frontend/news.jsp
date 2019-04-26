<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html>
<head>

<%@ include file="../head.jsp"%>

<link href="resources/frontend/css/src/JMCSS/Header.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/News.css" type="text/css" rel="stylesheet">

<!-- vue和iview引用文件 -->
<link rel="stylesheet" type="text/css" href="resources/css/lib/iview.css">
<script type="text/javascript" src="resources/js/lib/vue.min.js"></script>
<script type="text/javascript" src="resources/js/lib/iview.min.js"></script>
<script src="resources/js/lib/promise.js"></script>
<script type="text/javascript" src="resources/js/lib/aliyun-oss-sdk.min.js"></script>
</head>
<body>
	<%@ include file="header.jsp"%>
	<div id="news" class="JMNewsList" v-cloak :style="newsStyle">
		<row> <i-col span="16" push="4">
		<ul class="JMNewsListUl">
			<li class="JMNews" v-for="item in dataList">
				<img :src="item.thumb" /> 
					<a class="JMNewsTextBox" :href="'news/newsDetail/'+item.id" target="_blank"> 
						<span class="JMNewsText_date">{{item.publishTime}}</span>
						<h3 class="JMNewsText_title">{{item.title}}</h3>
						<p class="JMNewsText_content">{{item.newsAbstract}}</p>
					</a>
				<hr>
			</li>
		</ul>
		<Page :total="total" @on-change="pageOnChange" style="margin:40px auto;text-align: center;"></Page> </i-col> </row>
	</div>

	<%@ include file="footer.jsp"%>
	<script>
		var pageName = "news";
	</script>
	<script src="resources/js/lib/jquery-1.10.2.min.js"></script>
	<script src="resources/frontend/js/src/config.js"></script>
	<script src="resources/frontend/js/src/header.js"></script>
	<script src="resources/frontend/js/src/news.js"></script>

</body>
</html>