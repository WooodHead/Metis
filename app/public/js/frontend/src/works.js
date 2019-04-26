var works = new Vue({
	el:".works",
	data:function(){
		return{
			index:"",			//作品序列
			deleteModal:false,	//弹出层标识
			productTitle:"",	//作品标题
			total:0,
			columns: [
			    {title:"ID",key:"id",align: 'center'},
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
                groupNum: 0,
                subGroupNum: 0,
                status: 0,
                userId: 0,
                round:0,
                iDisplayStart: 0,
                iDisplayLength: 10,
                sEcho: "zy"
            }
		}
	},
	methods:{
		pageChange:function(page){
			console.log("pageChange",page);
			this.urlData.iDisplayStart = (page-1)*10;
    		var that = this;
    		$.ajax({
    	          url: config.ajaxUrls.worksGetByPage,
    	          type: "get",
    	          data: this.urlData,
    	          success: function (res) {
    	              that.$Loading.finish();
    	              that.dataList = res.aaData;
    	              that.total = res.iTotalRecords;
    	          },
    	          error: function () {
    	        	  that.$Loading.error();
    	        	  that.$Notice.error({title:res.message});
    	          }
    	      })
		},
		check:function(index){
			window.location.href = "production/workDetail/" + this.dataList[index].id;
		},
		change:function(index){
			window.location.href = "production/uploadWork/" + this.dataList[index].id;
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
              url: config.ajaxUrls.workRemove.replace(":id", this.dataList[this.index].id),
              type: "get",
              dataType: "json",
              success: function (res) {
                  if (res.success) {
                     that.$Notice.success({title:config.messages.optSuccess});
                     $.ajax({
                         url: config.ajaxUrls.worksGetByPage,
                         type: "get",
                         data: that.urlData,
                         success: function (res) {
                             that.$Loading.finish();
                             that.dataList = res.aaData;
                             that.total = res.iTotalRecords;
                         },
                         error: function () {
	                       	 that.$Loading.error();
	                       	 that.$Notice.error({title:res.message});
                         }
                     })
                  } else {
                      that.$Notice.error({title:res.message});
                      that.$Loading.error();
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
              	that.$Loading.finish();
              	that.dataList = res.aaData;
              	that.total = res.iTotalRecords;
          	},
          	error: function () {
        	  	that.$Loading.error();
        	  	that.$Notice.error({title:res.message});
          	}
		})
	}
})