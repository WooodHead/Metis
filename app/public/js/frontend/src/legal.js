var pageName = "legal";
let index = new Vue({
    el: ".index",
    data() {
        return {
            legalStyle: {
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
        this.legalStyle.minHeight = document.documentElement.clientHeight - config.cssHeight.headHeight - config.cssHeight.footHeight - 60 + "px";
    }
})
