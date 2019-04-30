var pageName = "news";
var newsDetail = new Vue({
    el:".index",
    data:function(){
        return{
            newsDetailStyle:{
                minHeight:""
            },
            newsDetail:""
        }
    },
    created:function(){
        let that = this;
        this.newsDetailStyle.minHeight = document.documentElement.clientHeight - config.cssHeight.headHeight - config.cssHeight.footHeight + "px";
        let id = window.location.href.split("newsDetail/")[1];
        console.log(id);

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
