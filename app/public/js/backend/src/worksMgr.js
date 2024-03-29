var pageName = "works";
$(document).click(function(){
	vm.scoreStyle.display = "none";
});
var vm = new Vue({
	el:".index",
	data:function(){
		return{
			scoreStyle:{
				display:"none",
				position:"fixed",
				marginLeft:"0px",
				top:"0px",width:"200px"
			},
			groupModel:"",
			subGroupModel:"",
			statusModel:"",
			totalPage:0,
			GroupList:[{value:"0",label:"全部"},{value:"1",label:"概念设计组"},{value:"2",label:"产品创新组"}],
			SubGroupList:[{value:"0",label:"全部"},{value:"1",label:"精准农业类 "},{value:"2",label:"非遗文创类"},{value:"3",label:"文旅融合类"},{value:"4",label:"生态科技类"}],
			JudgeRoundList: [{value: '0',label: '全部'}],				//顶部轮次筛选
			StatusList: [												//顶部状态筛选
                {value: '0',label: '全部'},{value: '1',label: '已提交'},{value: '2',label: '审核未通过'},{value: '3', label: '审核已通过'},{value: '4',label: '初选入围'},
                {value: '5',label: '初选未入围'},{value: '6',label: '复选入围'},{value: '7',label: '复选未入围'}
            ],
            statusTypes:[												//状态选择库
                {value: 1,label: '已提交'},{value: 2,label: '审核未通过'},{value: 3, label: '审核已通过'},{value: 4,label: '初选入围'},
                {value: 5,label: '初选未入围'},{value: 6,label: '复选入围'},{value: 7,label: '复选未入围'}
            ],
            roundTypes:[],												//轮次选择库
            columns: [
                  { title: 'ID',key: 'Id', align: 'center'},
                  { title: '缩略图',key: 'pImage', align: 'center',
               	   	render: (h, params) => {
                          return h('img', {
                   	   		domProps: { type: 'primary', size: 'small', src: this.dataList[params.index].pImage},
                            style: { width: '60px', height:"60px", margin:"10px auto" },
                          })
                      }
               	  },
                  { title: '名称',key: 'title', align: 'center'},
                  { title: '分数',key: 'score', align: 'center',
                	  render: (h, params) => {
                          return h('a', {
                                  props: { type: 'primary', size: 'small' },
                                  attrs :{ href:	"javascript:void(0)" },
                                  on:{
                                	  'click':(value,event) => {
                  	                		this.getRoundScore(params.index, value, event);
                                	  }
                                  }
                              },params.row.score)
                      }
                  },
                  { title: '状态',key: 'status', align: 'center',
                	  render: (h, params) => {
                	        return h('i-select', {
                	            props:{   value: this.dataList[params.index].status,transfer:true},
                	            on: {
                	                'on-change':(value) => {  this.changeStatus(params.index, value); }
                	            }
                	        },this.statusTypes.map(function(item){
                	            return h('i-option', {
                	                props: { value: item.value, label: item.label }
                	            }, item);
                	        })
                	        );
                	    }
                  },
                  { title: '所在评审轮次',key: 'round', align: 'center',
							render: (h, params) => {
							  return h('i-select', {
									props:{ value: this.dataList[params.index].round,transfer:true},
									on: {  'on-change':(value) => {
											this.changeRound(params.index, value);
										}
									         }
									  },this.roundTypes.map(function(type){
									      return h('i-option', {
									          props: { value: type.value, label: type.label }
									      }, type);
									  })
							  );
							}
                  },
                  { title: '更新时间',key: 'createAt', align: 'center'},
                  { title: '操作',key: 'opt', align: 'center',
               	   	render: (h, params) => {
                          return h('a', {
                                  props: { type: 'primary', size: 'small' },
                                  attrs :{
									  target:"_blank",
									  href:	config.viewUrls.manageWorkDetail.replace(":id",this.dataList[params.index].Id)},
                                  style: { marginRight: '5px' }
                              }, "详情")
                      }
                  }
              ],
              aoData1:{offset: 0,limit: 10,status: 0,groupNum: 0,subGroupNum: 0},
         	  aoData2:{offset: 0,limit: 1000},
         	  dataList:[],
         	  productImgArr:[],
         	  Scroecolumns: [						//table列选项
                  { title: '评审轮次',key: 'roundName', align: 'center'},
                  { title: '得分',key: 'averageScore', align: 'center'}
              ],
         	  RoundScroeList:[]		//分数显示数据（轮次）
		}
	},
	methods:{
		changeStatus:function(index, value){
			this.$Loading.start();
			var that = this;
			$.ajax({
	            dataType:'json',
	            type:"put",
	            url:config.ajaxUrls.workSetStatus.replace(":id",this.dataList[index].Id),
	            data:{status:value},
	            success: function (response) {
	                if(response.status == 200){
						that.$Loading.finish();
						that.$Notice.success({title:response.data});
	                }else{
	                	that.$Notice.error({title:response.data});
	                	getPageData(that);
	                }
	            }
	        });
		},
		changeRound:function(index, value){
        	this.$Loading.start();
			var that = this;
			$.ajax({
	            dataType:'json',
	            type:"post",
	            url:config.ajaxUrls.workSetRound,
	            data:{productionId:this.dataList[index].Id,round : value},
	            success: function (response) {
	                if(response.status == 200){
						that.$Loading.finish();
						that.$Notice.success({title:response.data});
	                	getPageData(that);
	                }else{
						that.$Loading.error();
	                	that.$Notice.error({title:"修改出错",desc:"1.作品状态无法选择评审轮次,	2.可能该轮次未绑定评委, 3.分数已更新为本轮次,无法修改"});
	                }
	            }
	        });
		},
		pageChange:function(index){
			this.$Loading.start();
			var that = this;
    		this.aoData1.offset = (index-1)*10;
			this.dataList = [];
    		getPageData(this);
		},
		groupCheck:function(value){
        	this.$Loading.start();
			var that = this;
			this.aoData1.groupNum = value;
			getPageData(this);
		},
		subGroupCheck:function(value){
        	this.$Loading.start();
			var that = this;
			this.aoData1.subGroupNum = value;
			getPageData(this);
		},
		roundCheck:function(value){
        	this.$Loading.start();
			var that = this;
			this.aoData1.round = value;
			getPageData(this);
		},
		statusCheck:function(value){
        	this.$Loading.start();
			var that = this;
			this.aoData1.offset = 0;
			this.aoData1.status = value;
			getPageData(this);
		},
		getRoundScore:function(index,event){
			var that = this;
			$.ajax({
	            dataType:'json',
	            type:"get",
	            url:config.ajaxUrls.getRoundScoreBean.replace(":id",this.dataList[index].Id),
	            success: function (response) {
	                if(response.status == 200){
						that.$Loading.finish();
						that.RoundScroeList = response.data;
						var poptipClientX = event.clientX  - 165, poptipClientY = event.clientY - 40 ;
						that.scoreStyle.display = "inline";
						that.scoreStyle.marginLeft = poptipClientX+"px";
						that.scoreStyle.top = poptipClientY+"px";
	                }else{
	                	that.$Notice.error({title:response.data});
	                }
	            }
	        });
		},
	},
	created:function(){
    	this.$Loading.start();
		var that = this;
		this.subGroupModel = "0",
		this.groupModel = "0",
		this.statusModel = "0",
		$.ajax({
            dataType:'json',
            type:"get",
            url:config.ajaxUrls.judgeRoundGetByPage,
            data:this.aoData2,
            success: function (response) {
                if(response.status == 200){
					that.$Loading.finish();
					for(var i=0;i<response.data.rows.length;i++){
						var roundBox = {};
						roundBox.value = response.data.rows[i].Id;
						roundBox.label = response.data.rows[i].roundName;
						that.JudgeRoundList.push(roundBox);
						that.roundTypes.push(roundBox);
					}
                }else{
                	that.$Notice.error({title:config.messages.loadDataError});
                }
            }
        });

		getPageData(this);

	}
})
function getPageData(that){
	$.ajax({
		dataType:'json',
        type:"GET",
        url:config.ajaxUrls.worksGetByPage,
        data:that.aoData1,
        success: function (response) {
            if(response.status == 200){
				that.$Loading.finish();
            	that.totalPage = response.data.count;
    	  		that.dataList = response.data.rows;
            }else{
				that.$Notice.error({title:response.data});
            }
        }
    });
}
