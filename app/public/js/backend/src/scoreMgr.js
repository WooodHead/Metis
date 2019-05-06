var pageName = "sendEmail";
var vm = new Vue({
	el:".index",
	data:function(){
		return{
			formItem: {
				input: ''
			},
			roundModel:"",
	      	JudgeRoundList:[],
	      	aoData:{
				limit:1000,
				offset:0
			},
	      	dataSourse:{
	      		round:""
	      	}
		}
	},
	methods:{
		submit:function(){
			var that = this;
			$.ajax({
		        url:config.ajaxUrls.workComputeScore,
		        type:"put",
		        data:that.dataSourse,
		        success:function(response){
		            if(response.status == 200){
		            	that.$Notice.success({title:response.data});
		            }else{
		            	that.$Notice.error({title:response.data});
		            }
		        },
		        error:function(){
		        	that.$Notice.error({title:config.messages.networkError});
		        }
		    });
		},
		roundCheck:function(index){
			this.roundModel = index;
			this.dataSourse.round = index;
		}
	},
	created:function(){
		var that = this;
		$.ajax({
	        url:config.ajaxUrls.judgeRoundGetByPage,
	        type:"get",
	        dataType:"json",
	        contentType :"application/json; charset=UTF-8",
	        data:that.aoData,
	        success:function(response){
	            if(response.success){
	                that.JudgeRoundList = response.data.rows;
	            }else{
	            	that.$Notice.error({title:response.data});
	            }
	        },
	        error:function(){
	        	that.$Notice.error({title:config.messages.networkError});
	        }
	    });
	}
})
