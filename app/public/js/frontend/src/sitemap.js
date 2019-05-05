var pageName = "sitemap";
let index = new Vue({
    el: ".sitemap",
    data() {
        return {
            sitemapStyle: {
                marginTop: "30px",
                marginBottom: "30px",
                minHeight: "",
                background: "#fff",
                padding:"20px 20px",
                border: "1px solid #dcdcdc",
                borderRadius: "10px",
                borderBottom: "1px solid #adadad"
            }
        }
    },
    created() {
        this.sitemapStyle.minHeight = document.documentElement.clientHeight - config.cssHeight.headHeight - config.cssHeight.footHeight - 60 + "px";
    }
})
