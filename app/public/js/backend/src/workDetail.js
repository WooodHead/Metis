var pageName = "worksMgr";
var workDetail = new Vue({
	el:".index",
	data:function(){
		return{
			productionId:"",

			participant_name:"",
			participant_id_number:"",
			participant_brief:"",

			title:"",
			content:"",
			attachFileDownload:"",
			attach_file:"",
			productImg_1:"",
			productImg_2:"",
			productImg_3:""
		}
	},
	created:function(){
		var that = this;
		this.productionId = window.location.href.split("workDetail/")[1];
		$.ajax({
          url: config.ajaxUrls.workDetail.replace(":id",this.productionId),
          type: "get",
          success: function (response) {
              if (response.status == 200) {
            	  that.title = response.data.title;
            	  that.content = response.data.content;
            	  that.attach_file = response.data.attach_file;
            	  that.participant_name = response.data.participant_name;
            	  that.participant_id_number = response.data.participant_id_number;
            	  that.participant_brief = response.data.participant_brief;
            	  that.attachFileDownload = response.data.attach_file;
            	  var pimageArr = new Array();
				  pimageArr = response.data.pImage.split(",");
            	  for(var i = 0;i < pimageArr.length;i++){
            		  if(pimageArr[i] == ""){
            			  pimageArr.splice(i,1);
            		      i = i - 1;
            		  }
            	  }
            	  for(var j = 0;j < pimageArr.length;j++){
            		  if(j == 0){
            			  that.productImg_1 = pimageArr[0];
            		  }
            		  if(j == 1){
            			  that.productImg_2 = pimageArr[1];
            		  }
            		  if(j == 2){
            			  that.productImg_3 = pimageArr[2];
            		  }
            	  }
              } else {
                  functions.ajaxReturnErrorHandler(response.data);
              }
          }
      })
	}
})
