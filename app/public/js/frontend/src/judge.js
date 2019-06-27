var pageName = "judge";
const sliderFinalWidth = 400;
const maxQuickWidth = 1200;

var judge = new Vue({
    el: '.index',
    data: function() {
        return {
            productListStyle: {
                width: "100%",
                minHeight: ""
            },
            total: 0,
            pageSize: 12,
            list: [],
            theme1: 'light',
            score: 0,
            title: '',
            content: '',
            attachFile: "",
            attachFileShow: false,
            imgUrl: "",
            productionId: '',
            groupNum: "",
            bigImgData: [],
            mediumImg: "",
            imgBox: "",
            previewModal: false,
            modelImg: "",
            unrated: false, //当出现未打分时，显示未打分图片

            aoData: {
                offset: 0,
                limit: 12,
                scoreSign: 0
            },
            reviewId:"",
            imgList: [],
        }
    },
    created: function() {
        let that = this;
        this.productListStyle.minHeight = document.documentElement.clientHeight - config.cssHeight.headHeight - config.cssHeight.footHeight + "px";
        this.loadData(1);

    },
    methods: {
        menuSelect: function(name) {
            if (name == 1) {
                this.aoData.scoreSign = 0;
            } else if (name == 2) {
                this.aoData.scoreSign = 1;
            } else if (name == 3) {
                this.aoData.scoreSign = 2;
            }
            this.loadData(1);
        },
        loadData: function(pageNum) {
            var that = this;
            this.aoData.offset = (pageNum - 1) * 12;
            $.ajax({
                url: config.ajaxUrls.judgeToScoreList,
                type: "get",
                data: this.aoData,
                success: function(response) {
                    if (response.status == 200) {
                        if (that.aoData.scoreSign == 2 && response.data.count == 0) {
                            that.unrated = true;
                        } else {
                            that.unrated = false;
                        }
                        var results = response.data.rows;
                        that.list = results;
                        that.total = response.data.count;
                    }
                }
            })
        },
        openDetail: function(workId,reviewId) {
            let that = this;
            var title = '';
            var content = '';
            var score = '';
            let list = [];
            this.reviewId = reviewId;
            $(".JMHeader .JMNoticeBoard").css("opacity", "0.1");
            $.ajax({
                url: config.ajaxUrls.getDetailByIdForJudge.replace(":id", workId),
                type: 'GET',
                success(res) {
                    that.content = res.data.content;
                    that.attachFile = res.data.attach_file;
                    if (res.data.attach_file == "" || res.data.attach_file == null) {
                        that.attachFileShow = false;
                    } else {
                        that.attachFileShow = true;
                    }
                    that.score = res.data.score;
                    that.title = res.data.title;
                    that.productionId = res.data.Id;
                    list = res.data.pImage.split(",");
                    list.pop();
                    $(".selected").empty();
                    $(".selected").append("<div class='swiper-container'> <div class='swiper-wrapper'></div><div class='swiper-pagination'>" + "</div><div class='swiper-button-prev'></div><div class='swiper-button-next'></div></div>");
                    //swiper图片加载
                    for (var imgItem = 0; imgItem < list.length; imgItem++) {
                        var imgSrc = list[imgItem];
                        $(".swiper-wrapper").append("<div class='swiper-slide'><img id='productImage' src=" + imgSrc + "></div>");
                    }
                    //初始化swiper
                    $(".swiper-wrapper .swiper-slide img").css("cursor", "pointer");
                    var mySwiper = new Swiper('.swiper-container', {
                        loop: false,
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true
                        },
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }
                    });
                    mySwiper.updateSlides();
                    mySwiper.updateProgress();


                    $("img[id='productImage']").each(function(index) {
                        $(this).click(function() {
                            that.previewModal = true;
                            that.modelImg = list[index];
                        })
                    })

                    var selectedImage = $("#" + workId);
                    $('body').addClass('overlay-layer');
                    that.animateQuickView(selectedImage, sliderFinalWidth, maxQuickWidth, 'open');
                }
            })
        },
        closeQuickView: function(finalWidth, maxQuickWidth) {
            $(".JMHeader .JMNoticeBoard").css("opacity", "1");
            var selectedImage = $('.empty-box').find('img')
            if (this.groupNum == 2) {
                var close = $('.cd-close');
            } else if (this.groupNum == 1) {
                var close = $('.cd-close'),
                    activeSliderUrl = close.siblings('.cd-slider-wrapper').find('.selected img').attr('src'),
                    selectedImage = $('.empty-box').find('img');
            }
            if (!$('.cd-quick-view').hasClass('velocity-animating') && $('.cd-quick-view').hasClass('add-content')) {
                //还原点击之前的url
                this.animateQuickView(selectedImage, finalWidth, maxQuickWidth, 'close');
            } else {
                this.closeNoAnimation(selectedImage, finalWidth, maxQuickWidth);
            }
        },
        animateQuickView: function(image, finalWidth, maxQuickWidth, animationType) {
            var parentListItem = image.parent('.cd-item'),
                topSelected = image.offset().top - $(window).scrollTop(),
                leftSelected = image.offset().left,
                widthSelected = image.width(),
                heightSelected = image.height(),
                windowWidth = $(window).width(),
                windowHeight = $(window).height(),
                finalLeft = (windowWidth - finalWidth) / 2,
                finalHeight = finalWidth * heightSelected / widthSelected + 240,
                finalTop = (windowHeight - finalHeight) / 2 - 100,
                quickViewWidth = (windowWidth * .8 < maxQuickWidth) ? windowWidth * .8 : maxQuickWidth,
                quickViewLeft = (windowWidth - quickViewWidth) / 2;

            if (windowHeight < 900) {
                finalTop = 20;
            }
            if (windowHeight > 900) {
                finalTop = 60;
            }

            if (animationType == 'open') {
                parentListItem.addClass('empty-box');
                $('.cd-quick-view').css({
                    'top': finalTop + 'px',
                    'left': quickViewLeft + 'px',
                    'width': quickViewWidth + 'px',
                }).addClass('is-visible');
                $('.cd-quick-view').addClass('animate-width');
                $('.cd-quick-view').addClass('add-content');
                $('.cd-quick-view').removeClass("animated zoomOut");
                $('.cd-quick-view').addClass("animated zoomIn");
            } else {
                $('.cd-quick-view').removeClass("animated zoomIn");
                $('.cd-quick-view').addClass("animated zoomOut");
                $('.cd-quick-view').removeClass('add-content animate-width is-visible');
                $('body').removeClass('overlay-layer');
                parentListItem.removeClass('empty-box');
            }
        },
        closeNoAnimation: function(image, finalWidth, maxQuickWidth) {
            var parentListItem = image.parent('.cd-item'),
                topSelected = image.offset().top - $(window).scrollTop(),
                leftSelected = image.offset().left,
                widthSelected = image.width();

            $('body').removeClass('overlay-layer');
            parentListItem.removeClass('empty-box');
            $('.cd-quick-view').velocity("stop").removeClass('add-content animate-width is-visible').css({
                "top": topSelected,
                "left": leftSelected,
                "width": widthSelected,
            });
        },
        scoreBtnClick: function() {
            var reg = /^[0-9]+$/;
            var that = this;
            if (reg.test(this.score)) {
                $.ajax({
                    url: config.ajaxUrls.judgeScore.replace(":id",this.reviewId),
                    type: "put",
                    data: {
                        score: parseInt(this.score)
                    },
                    success: function(response) {
                        if (response.status == 200) {
                            for (var i = 0; i < that.list.length; i++) {
                                if (that.list[i].production.Id == that.productionId) {
                                    that.list[i].score = that.score;
                                    break;
                                }
                            }
                            that.closeQuickView();
                        } else {
                            that.$Notice.error({
                                title: response.data
                            });
                        }
                    }
                })
            } else {
                that.$Notice.error({
                    title: config.messages.scoreError
                });
            }
        }
    },
})
