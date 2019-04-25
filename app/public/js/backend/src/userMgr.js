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
		          { title: '邮箱状态',key: 'activesign', align: 'center',
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
		          { title: '更新时间',key: 'createtime', align: 'center'},
		          { title: '操作',key: 'valid', align: 'center',
		       	   render: (h, params) => {
		       		if (this.dataList[params.index].valid == 1) {
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
	                                       this.statusChange(params.index)
	                                   }
	                               }
	        			    },"有效")
	        			  } else {
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
	                                       this.statusChange(params.index)
	                                   }
	                               }
	        				  },"禁用")
	        			  }
		              }
		          }
		      ],
		    dataList:[],
			totalPage:0,
			aoData1:[
	  	        {name: "offset", value: 0},
	  	        {name: "limit", value: 10}
	      	],
	      	aoData2:[
	  	        {name: "email", value: ""},
	  	        {name: "valid", value: 0}
		    ],
		}
	 },
	 methods:{
		 pageChange:function(index){
		 	this.aoData1[0].value = (index-1)*10;
    		this.dataList = [];
    		var that = this;
    		$.ajax({
                "dataType":'json',
                "type":"post",
                "url":config.ajaxUrls.userGetByPage,
                "data":this.aoData1,
                "success": function (response) {
                	that.dataList = response.aaData;
                    if(response.success===false){
	            		that.$Notice.error({title:response.message});
                    }else{
//	                    	清空数据盒，装新数据
                    	that.dataList = response.aaData;
                    }
                }
            });
		 },
		 statusChange:function(index){
			 var that = this;
			 this.aoData2[0].value = this.dataList[index].email;
			 if(this.dataList[index].valid == 0){
				 this.aoData2[1].value = 1;
			 }else{
				 this.aoData2[1].value = 0;
			 }
	        $.ajax({
	            "dataType":'json',
	            "type":"post",
	            "url":config.ajaxUrls.userActiveAction,
	            "data":this.aoData2,
	            "success": function (response) {
	            	if(response.success===false){
	            		that.$Notice.error({title:response.message});
	                }else{
	                	that.$Notice.success({title:config.messages.optSuccess});
	                	$.ajax({
	                        "dataType":'json',
	                        "type":"post",
	                        "url":config.ajaxUrls.userGetByPage,
	                        "data":that.aoData1,
	                        "success": function (response) {
	                        	if(response.success===false){
	        	            		that.$Notice.error({title:response.message});
	                            }else{
	                            	that.dataList = response.aaData;
	                            	that.totalPage = response.iTotalRecords;
	                            }
	                        }
	                    });
	                }
	            }
	        });
		 }
	 },
	 created:function(){
		 var that = this;
		 $.ajax({
            dataType:'json',
            type:"get",
            url:config.ajaxUrls.userGetByPage,
            data:this.aoData1,
            success: function (response) {
				console.log(response);
            	if(response.status == 200){
					that.dataList = response.data.rows;
					that.totalPage = response.data.count;
                }else{
            		that.$Notice.error({title:response.message});
                }
            }
        });
	 }
})
