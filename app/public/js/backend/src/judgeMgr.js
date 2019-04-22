'use strict';

var appServer = 'http://localhost:8080/dcpro/sigUploadKey/1';
var bucket = 'dc-sys-pro';
var region = 'oss-cn-hangzhou';

var urllib = OSS.urllib;
var Buffer = OSS.Buffer;
var OSS = OSS.Wrapper;
var STS = OSS.STS;

var Component = new Vue({
	el:".judgeMgr",
	data :function() {
        return {
        	aoData1:{offset: 0,limit: 10},
        	columns: [
        	   { title: 'ID',key: 'Id', align: 'center'},
               { title: '头像',key: 'headicon', align: 'center',
            	   render: (h, params) => {
                       return h('img', {
                    	   	domProps: {
                                   type: 'primary',
                                   size: 'small',
                                   src: Component.productImgArr[params.index]
                               },
                               style: {
                                   width: '80px',
                                   height:"80px",
                                   margin:"10px auto"
                               },
                           })
                   }},
               { title: '姓名',key: 'name', align: 'center'},
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
           productImgArr:[],
           totalPage:"",
           deleteModal:false,
           index:"",
           judgeTitle:"",
           judgeHeadIconArr:[]
        }
    },
    created:function(){
    	var that = this;
    	getPageData(this);
    },
    methods:{
    	pageChange:function(changPage){
    		this.aoData1.offset = (changPage-1)*10;
    		this.dataList = [];
    		var that = this;
    		getPageData(this);
    	},
    	change :function(index) {
    		var id = this.dataList[index].Id;
    		window.location.href = config.viewUrls.judgeUpdate.replace(":id",id);
        },
        remove :function(index) {
        	this.judgeTitle = this.dataList[index].name;
        	this.index = index;
        	this.deleteModal = true;
        },
        ok :function() {
        	var id = this.dataList[this.index].id;
        	var that = this;
        	$.ajax({
                "dataType":'json',
                "type":"post",
                "url":config.ajaxUrls.judgeRemove.replace(":id",id),
                "success": function (response) {
                    if(response.success===false){
                    	that.$Notice.error({title:response.message});
                    }else{
                    	that.$Notice.success({title:config.messages.optSuccess});
                    	getPageData(that);
                    }
                }
            });
        }
    }
})
function getPageData(that){
	$.ajax({
        "dataType":'json',
        "type":"get",
        "url":config.ajaxUrls.judgeGetByPage,
        "data":that.aoData1,
        "success": function (response) {
			console.log(response);
            if(response.status===false){
            	that.$Notice.error({title:response.message});
            }else{
    	  		for(var j = 0;j<response.data.rows.length;j++){
        	  		that.productImgArr[j] = response.data.rows[j].headicon;
    	  		}

    	  		that.dataList = response.data.rows;
            	that.totalPage = response.data.count;

            }
        }
    });
}
