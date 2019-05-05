var pageName = "judges";

var judgeDetail = new Vue({
    el:".index",
    data:function(){
        return{
            judgeDetailStyle:{
                minHeight:"",
                paddingTop:"60px"
            },
            language:"0",
            name:"",
            subTitle:"",
            description:"",
            judgeHeadicon:""
        }
    },
    created:function(){
        var that = this;
        this.judgeDetailStyle.minHeight = document.documentElement.clientHeight - config.cssHeight.headHeight - config.cssHeight.footHeight + "px";
        var id = window.location.href.split("judgeDetail/")[1];
        $.ajax({
            type:"get",
            url:config.ajaxUrls.judgeDetail.replace(":id",id),
            success:function(response){
                console.log(response);
                if(response.status == 200){
                    that.judgeHeadicon = response.data.headicon;
                    that.name =response.data.name;
                    that.description = response.data.description;
                }else{
                    that.$Notice.error({title:response.data});
                }
            },
            error:function(){
                that.$Notice.error({title:config.messages.networkError});
            }
        })
    }
})
