var pageName = "user";

var vm = new Vue({
	el:".index",
	data:function(){
		return{
	       	columns: [						//table列选项
		          { title: '邮箱',key: 'email', align: 'center'},
		          { title: '姓名',key: 'realname', align: 'center'},
		          { title: '电话号码',key: 'mobile', align: 'center'},
		          { title: '地址',key: 'address', align: 'center'},
		          { title: '状态',key: 'valid', align: 'center',
		        	  render: (h, params) => {
	        			    return h('div',{
	        			    	props: {
		                              type: 'primary',
		                              size: 'small'
		                          },
		                          style: {
		                              marginRight: '5px'
		                          }
	        			    },config.userStatus[this.dataList[params.index].valid])
		              }
		          },
		          { title: '账号状态',key: 'activesign', align: 'center',
		        	  render: (h, params) => {
	        			    return h('div',{
	        			    	props: {
		                              type: 'primary',
		                              size: 'small'
		                          },
		                          style: {
		                              marginRight: '5px'
		                          }
	        			    },config.emailStatus[this.dataList[params.index].activesign])
		              }
			      },
		          { title: '更新时间',key: 'createAt', align: 'center'},
				  { title: '操作',key: 'valid', align: 'center',
		       	   render: (h, params) => {
		       		if (this.dataList[params.index].valid == 1) {
	        			    return h('Button',{
	        			    	props: {
		                              type: 'success',
		                              size: 'small'
		                          },
		                          style: {
		                              marginRight: '5px'
		                          },
		                          on: {
	                                   click: () => {
	                                       this.statusChange(params.index)
	                                   }
	                               }
	        			    },"有效")
	        			  } else {
	        				  return h('Button',{
	        					  props: {
		                              type: 'error',
		                              size: 'small'
		                          },
		                          style: {
		                              marginRight: '5px'
		                          },
		                          on: {
	                                   click: () => {
	                                       this.statusChange(params.index)
	                                   }
	                               }
	        				  },"禁用")
	        			  }
		              }
		          },
		        { title: '用户修改',key: 'valid', align: 'center',
		       	   	render: (h, params) => {
        			    return h('Button',{
        			    	props: {
	                              type: 'primary',
	                              size: 'small'
	                          },
	                          style: {
	                              marginRight: '5px'
	                          },
	                          on: {
                                   click: () => {
                                       this.userUpdate(params.index)
                                   }
                               }
        			    },"修改")
        			}
		        }
		    ],
		    dataList:[],
			totalPage:0,
			aoData:{
				limit:10,
				offset:0
			}
		}
	 },
	 methods:{
		 pageChange:function(index){
		 	this.aoData.offset = (index-1)*10;
    		this.dataList = [];
    		var that = this;
			$.ajax({
				dataType:'json',
				type:"get",
				url:config.ajaxUrls.userGetByPage,
				data:that.aoData,
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
		 statusChange:function(index){
			 var that = this;
	        $.ajax({
	            dataType:'json',
	            type:"put",
	            url:config.ajaxUrls.userActiveAction.replace(":id",this.dataList[index].Id),
	            data:{valid : this.dataList[index].valid == 0 ? 1 : 0},
	            success: function (response) {
	            	if(response.status == 200){
						that.$Notice.success({title:response.data});
						$.ajax({
							dataType:'json',
							type:"get",
							url:config.ajaxUrls.userGetByPage,
							data:that.aoData,
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
		},
		userUpdate(index){
			var id = this.dataList[index].Id;
            window.location.href = config.viewUrls.userUpdate.replace(":id", id);
		}
	 },
	 created:function(){
		var that = this;
		$.ajax({
            dataType:'json',
            type:"get",
            url:config.ajaxUrls.userGetByPage,
            data:this.aoData,
            success: function (response) {
            	if(response.status == 200){
					that.dataList = response.data.rows;
					that.totalPage = response.data.count;
                }else{
            		that.$Notice.error({title:response.data});
                }
            }
        });
	 }
})
