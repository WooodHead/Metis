'use strict';

var appServer = 'http://localhost:8080/dcpro/sigUploadKey/1';
var bucket = 'dc-sys-pro';
var region = 'oss-cn-hangzhou';

var urllib = OSS.urllib;
var Buffer = OSS.Buffer;
var OSS = OSS.Wrapper;
var STS = OSS.STS;

var pageName = "index";

var mySwiper = new Swiper('.swiper-container', {
	loop: true,
	autoplay: {
		delay:5000
	},//可选选项，自动滑动
	pagination: {
        el: '.swiper-pagination'
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})

var index = new Vue({
	el:".index",
	data:function(){
		return{
			aoData:{
				limit:3,
				offset:0,
				language:0
			},
			dataList:[]
		}
	},
	created:function(){
		var that = this;
		$.ajax({
            dataType:'json',
            type:"get",
            data:this.aoData,
            url:config.ajaxUrls.manageNews,
            success(res) {
                if(res.status == 200){
        	  		that.dataList = res.data.rows;
                	that.total = res.data.count;
                }else{
					that.$Notice.error({title:res.data});
                }
            }
        });
	}
})
