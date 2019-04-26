var pageName = "works";
var works = new Vue({
	el:".index",
	data:function(){
		return{
			index:"",			//作品序列
			deleteModal:false,	//弹出层标识
			productTitle:"",	//作品标题
			total:0,
			columns: [
			    {title:"ID",key:"Id",align: 'center'},
			    {title:"标题",key:"title",align: 'center'},
			    {title:"简介",key:"content",align: 'center'},
			    {title:"状态",key:"status",align: 'center',
			    	render: (h, params) => {
	                       return h('div', [
	                           h('p', config.workStatus[params.row.status])
	                       ]);
	                   }
			    },
			    {title:"操作",key:"opt",align: 'center',

			    	 render: (h, params) => {
				    	if(params.row.status == 1){
				    		return h('div', [
	                           h('Button', {
	                               props: { type: 'primary', size: 'small' },
	                               style: { marginRight: '5px' },
	                               on: {
	                                   click: () => {
	                                       this.check(params.index)
	                                   }
	                               }
	                           }, '查看'),
	                           h('Button', {
	                               props: { type: 'primary', size: 'small' },
	                               style: { marginRight: '5px' },
	                               on: {
	                                   click: () => {
	                                       this.change(params.index)
	                                   }
	                               }
	                           }, '修改'),
	                           h('Button', {
	                               props: { type: 'error', size: 'small' },
	                               on: {
	                                   click: () => {
	                                       this.remove(params.index)
	                                   }
	                               }
	                           }, '删除')
	                       ]);
				    	}else{
				    		return h('div', [
	                           h('Button', {
	                        	   props: { type: 'primary', size: 'small' },
	                               style: { marginRight: '5px' },
	                               on: {
	                            	   click: () => {
	                                       this.check(params.index)
	                                   }
	                               }
	                           }, '查看')
	                       ]);
				    	}

	                 }
			    }
			],
            dataList: [],
            workStyle:{
            	minHeight:"",
        		margin:"30px auto",
        		width:"80%"
            },
            urlData:{
                limit: 10,
                offset: 0
            }
		}
	},
	methods:{
		pageChange:function(page){
			this.urlData.offset = (page-1)*10;
    		var that = this;
			that.$Loading.start();
			$.ajax({
				url: config.ajaxUrls.worksGetByPage,
	          	type: "get",
	          	data: this.urlData,
	          	success: function (res) {
					if(res.status == 200){
		              	that.$Loading.finish();
		              	that.dataList = res.data.rows;
		              	that.total = res.data.count;
					}else{
		        	  	that.$Loading.error();
		        	  	that.$Notice.error({title:res.data});
					}
	          	},
	          	error: function () {
	        	  	that.$Loading.error();
	        	  	that.$Notice.error({title:res.data});
	          	}
			})
		},
		check:function(index){
			window.location.href = "worksDetail/" + this.dataList[index].Id;
		},
		change:function(index){
			window.location.href = "uploadWork/" + this.dataList[index].Id;
		},
		remove:function(index){
			this.index = index;
			this.deleteModal = true;
			this.productTitle = this.dataList[index].title;
		},
		ok:function(){
			var that = this;
			this.$Loading.start();
			$.ajax({
              url: config.ajaxUrls.workRemove.replace(":id", this.dataList[this.index].Id),
              type: "delete",
              dataType: "json",
              success: function (res) {
                  if (res.status == 200) {
                     that.$Notice.success({title:config.messages.optSuccess});
					 $.ajax({
 						url: config.ajaxUrls.worksGetByPage,
 			          	type: "get",
 			          	data: that.urlData,
 			          	success: function (res) {
 							if(res.status == 200){
 				              	that.$Loading.finish();
 				              	that.dataList = res.data.rows;
 				              	that.total = res.data.count;
 							}else{
 				        	  	that.$Loading.error();
 				        	  	that.$Notice.error({title:res.data});
 							}
 			          	},
 			          	error: function () {
 			        	  	that.$Loading.error();
 			        	  	that.$Notice.error({title:res.data});
 			          	}
 					})
				}

              }
          });
		}
	},
	created:function(){
		this.workStyle.minHeight = document.documentElement.clientHeight - config.cssHeight.headHeight - config.cssHeight.footHeight - 140 + "px";
		var that = this;
		this.$Loading.start();
		$.ajax({
			url: config.ajaxUrls.worksGetByPage,
          	type: "get",
          	data: this.urlData,
          	success: function (res) {
				if(res.status == 200){
	              	that.$Loading.finish();
	              	that.dataList = res.data.rows;
	              	that.total = res.data.count;
				}else{
	        	  	that.$Loading.error();
	        	  	that.$Notice.error({title:res.data});
				}
          	},
          	error: function () {
        	  	that.$Loading.error();
        	  	that.$Notice.error({title:res.data});
          	}
		})
	}
})
