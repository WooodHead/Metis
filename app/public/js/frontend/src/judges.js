var pageName = "judges";

var judges = new Vue({
	el:".index",
	data:function(){
		return{
			dataList:[],
			language:"0",
			judgeStyle:{
				minHeight:"",
			  	marginTop: config.cssHeight.headHeight + "px"
			},
			aoData1:{offset: 0,limit: 10, language:0}
		}
	},
	methods:{
	},
	created:function(){
		var that = this;
		this.judgeStyle.minHeight = document.documentElement.clientHeight - config.cssHeight.headHeight - config.cssHeight.footHeight + "px";
		$.ajax({
	        dataType:'json',
	        type:"get",
	        url:config.ajaxUrls.judgeGetByPage,
	        data:that.aoData1,
	        success: function (response) {
	            if(response.status == 200){
					console.log(response);
					that.dataList = response.data.rows;
					that.totalPage = response.data.count;
	            }else{
					that.$Notice.error({title:response.message});
	            }
	        }
	    });
	}
})
