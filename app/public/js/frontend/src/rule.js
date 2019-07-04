var pageName = "rule";
var timer, scrollTops = [];
$(document).ready(function() {
        function findIndex(list, value) {
            var flag = 0;
            for (var i = list.length - 1; i > 0; i--) {
                if (value >= list[i]) {
                    flag = i;
                    break;
                }
            }
            return flag;
        }
        $(".JMRuleDetail img").each(function(index, el) {
            if (index != 1) {
                $(this).load(function(){
                  scrollTops.push($(this).offset().top);
                });
            }
        });

        $("#JMRuleTip .JMItem").click(function() {
            var targetId = $(this).find(".JMLink").data("href");
            $("#JMRuleTip .JMActive").removeClass("JMActive");
            $(this).addClass("JMActive");
            $('html,body').animate({
                scrollTop : $(targetId).offset().top + 10
            }, 500);
        });

        $(window).scroll(
            function() {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(function() {
                    var index = findIndex(scrollTops,window.scrollY);
                    $("#JMRuleTip .JMActive").removeClass("JMActive");
                    $("#JMRuleTip .JMItem:eq(" + index + ")").addClass("JMActive");
                }, 100);
            }
        );


});
let index = new Vue({
    el:".index",
    data(){
        return{
            ruleStyle:{
				marginTop: "30px",
                marginBottom: "30px",
                background: "#fff",
                padding:"20px 20px",
                border: "1px solid #dcdcdc",
                borderRadius: "10px",
                borderBottom: "1px solid #adadad"
            }
        }
    }
})
