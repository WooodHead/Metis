var pageName = "news";
var index = new Vue({
	el:".index",
	data () {
        return {
        	aoData1:{offset: 0,limit: 10,language:0},
        	columns: [
        	   { title: 'ID',key: 'Id', align: 'center'},
               { title: '标题',key: 'title', align: 'center'},
               { title: '日期',key: 'createAt', align: 'center'},
               { title: '操作',key: 'opt', align: 'center',
            	   render: (h, params) => {
                       return h('div', [
                           h('Button', {
                               props: {
                                   type: 'primary',
                                   size: 'small'
                               },
                               style: {
                                   marginRight: '5px'
                               },
                               on: {
                                   click: () => {
                                       this.change(params.index)
                                   }
                               }
                           }, '修改'),
                           h('Button', {
                               props: {
                                   type: 'error',
                                   size: 'small'
                               },
                               on: {
                                   click: () => {
                                       this.remove(params.index)
                                   }
                               }
                           }, '删除')
                       ]);
                   }
               }
           ],
           dataList: [],
           totalPage:0,
           deleteModal:false,
           index:"",
           newsTitle:""
        }
    },
    created:function(){
    	var that = this;
    	$.ajax({
            dataType:'json',
            type:"get",
            url:config.ajaxUrls.manageNews,
            data:this.aoData1,
            success: function (response) {
                if(response.status == 200){
					that.dataList = response.data.rows;
					that.totalPage = response.data.count;
                }else{
                	that.$Notice.error({title:response.data});
                }
            }
        });
    },
    methods:{
    	pageChange:function(changPage){
    		this.aoData1.offset = (changPage-1)*10;
    		var that = this;
			$.ajax({
	            dataType:'json',
	            type:"get",
	            url:config.ajaxUrls.manageNews,
	            data:this.aoData1,
	            success: function (response) {
	                if(response.status == 200){
						that.dataList = response.data.rows;
						that.totalPage = response.data.count;
	                }else{
	                	that.$Notice.error({title:response.data});
	                }
	            }
	        });
    	},
    	change :function(index) {
    		var id = this.dataList[index].Id;
    		window.location.href = config.viewUrls.newsUpdate.replace(":id",id);
        },
        remove :function(index) {
        	this.newsTitle = this.dataList[index].title;
        	this.index = index;
        	this.deleteModal = true;
        },
        ok :function() {
        	var that = this;
        	$.ajax({
            	dataType:'json',
                type:"delete",
                url:config.ajaxUrls.newsRemove.replace(":id", this.dataList[this.index].Id),
                success: function (response) {
                    if(response.status == 200){
						that.$Notice.success({title:response.data});
						$.ajax({
							dataType:'json',
							type:"get",
							url:config.ajaxUrls.manageNews,
							data:that.aoData1,
							success: function (response) {
								if(response.status == 200){
									that.dataList = response.data.rows;
									that.totalPage = response.data.count;
								}else{
									that.$Notice.error({title:response.data});
								}
							}
						});
                    }else{
                    	that.$Notice.error({title:response.data});
                    }
                }
            });
        }
    }
})
