var pageName = "news";
var newsDetail = new Vue({
    el:".index",
    data:function(){
        return{
            newsDetailStyle:{
                minHeight:"",
                marginTop: "30px",
                marginBottom: "30px",
                background: "#fff",
                padding:"20px 20px",
                border: "1px solid #dcdcdc",
                borderRadius: "10px",
                borderBottom: "1px solid #adadad"
            },
            newsDetail:""
        }
    },
    created:function(){
        let that = this;
        this.newsDetailStyle.minHeight = document.documentElement.clientHeight - config.cssHeight.headHeight - config.cssHeight.footHeight - 60 + "px";
        let id = window.location.href.split("newsDetail/")[1];

        $.ajax({
            dataType:"json",
            type:"get",
            url:config.ajaxUrls.newsDetail.replace(":id",id),
            success:function(response){
                if(response.status == 200){
                    that.newsDetail = response.data;
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
