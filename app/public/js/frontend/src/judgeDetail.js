var pageName = "judges";

var judgeDetail = new Vue({
    el:".index",
    data:function(){
        return{
            judgeDetailStyle:{
                paddingTop:"60px",
                minHeight:"",
                marginTop: "30px",
                marginBottom: "30px",
                background: "#fff",
                padding:"20px 20px",
                border: "1px solid #dcdcdc",
                borderRadius: "10px",
                borderBottom: "1px solid #adadad"
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
