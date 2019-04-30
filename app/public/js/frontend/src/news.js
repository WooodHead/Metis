var pageName = "news";

var news = new Vue({
	el:".index",
	data(){
		return{
			newsStyle:{
				minHeight:""
			},
			total:0,
			aoData:{offset: 0,limit: 10,language:0},
			dataList:[]
		}
	},
	methods:{
		pageOnChange(page){
			var that = this;
			this.aoData.offset = (page-1)*10;
			$.ajax({
	            dataType:'json',
	            type:"get",
	            data:this.aoData,
	            url:config.ajaxUrls.manageNews,
	            success(res) {
	                if(res.status == 200){
	        	  		that.dataList = res.data.rows;
	                }else{
						that.$Notice.error({title:res.data});
	                }
	            }
	        });
		}
	},
	created(){
		var that = this;
		this.newsStyle.minHeight = document.documentElement.clientHeight - config.cssHeight.headHeight - config.cssHeight.footHeight + "px";
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
