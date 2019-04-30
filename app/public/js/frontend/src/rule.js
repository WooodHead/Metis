var pageName = "rule";
$(document).ready(
    function() {
        var timer, scrollTops = [];
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
        $("#JMRuleTip .JMItem").click(function() {
            var targetId = $(this).find(".JMLink").data("href");
            $("#JMRuleTip .JMActive").removeClass("JMActive");
            $(this).addClass("JMActive");
            $('html,body').animate({
                scrollTop : $(targetId).offset().top + 10
            }, 500);
        });

        $(".JMSection").each(function(index, el) {
            scrollTops.push($(this).offset().top);
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
    }
);
