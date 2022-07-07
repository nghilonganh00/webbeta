"use strict";

// (function (e) {
//     e.fn.animated = function(t) {
//         e(this).each(function() {
//             console.log(e(this));
//             var n = e(this);
//             n.css("opacity", "0").addClass("animated");
//             n.css("opacity", "0").addClass(t);
//         })
//     }
// })(jQuery);

(function($) {
    $(function() {
        var scroll = $(document).scrollTop(),
            window_view = $(window),
            headerHeigth = $('#top-nav').outerHeight();

        // Header-fixed
        window_view.on('scroll', function() {
            var winTop = window_view.scrollTop(),
                navbar = $("#top-nav");
            if(winTop > 150) {
                navbar.addClass("is-sticky");
            }
            else {
                navbar.removeClass("is-sticky");
            }
            // $(function() {
            //     var y = $(this).scrollTop(),
            //         bg_video = $('#bg-video');
            //     if (y > 1000) {
            //         bg_video.fadeIn('slow');
            //     }
            //     else {
            //         bg_video.fadeOut('slow');
            //     } 
            // });
            $(function(){
                var scrolled = $(document).scrollTop(),
                    top_nav = $("#top-nav");

                    if(scrolled > headerHeigth) {
                        top_nav.addClass("off-menu");
                    }
                    else {
                        top_nav.removeClass("off-menu");
                    }

                if (scrolled > scroll) {
                    top_nav.removeClass("fixed-menu");
                }
                else {
                    top_nav.addClass("fixed-menu");
                }
                    scroll =  $(document).scrollTop();
            })

        })
    })

    // Fade Background-Video
    $(function() {
        var bg_video = $('#bg-video'),
            window_view = $(window),
            height_bg = bg_video.height();
        window_view.scroll(function (){
            effectFadeHeader(bg_video, height_bg);
        });
        function effectFadeHeader(bg_video, height_bg) {
            var scroll = $(document).scrollTop();
            if(height_bg > scroll ) {
                bg_video.css('opacity', 1 - scroll/height_bg);
            }
            
        };
    })

    // Animations
   
    // $(function () {
	// 	var animation = $('.heading-title'),
    //         window_view = $(window);
    //     window_view.scroll(function (){
    //         effectAnimation(animation);
    //     });
    //     function effectAnimation (animation) {
    //         var scroll = $(document).scrollTop();

    //         animation.each(function() {
    //             var item_height = $(this).height();
    //             console.log(scroll, item_height);
    //             if(scroll > item_height) {
    //                 console.log("true");
    //                 $(".heading-title > h2").animated("fade-in-down");
    //                 $(".heading-title > p").animated("fade-in-up");
    //                 $(".heading-title > .small-desd").animated("fadeIn");
    //                 $(".animated-service").animated("fadeIn");
    //                 $(".masonry-item-pr, .masonry-item").animated("fadeIn");
    //             }
    //         });
            

    //     }
	// });

    // Tabs 
    $(function (){
        var tabs = $('.item-service'),
            descriptions = $('.description-item'),
            list = $('.list');
        tabs.each(function(index) {
            $(this).on('click', function() {
                tabs.removeClass('tab-active');
                descriptions.removeClass('active');
                list.removeClass('active');

                $(this).addClass('tab-active');
                descriptions.eq(index).addClass('active');
                list.eq(index).addClass('active');
            })
        })
    });

    // Direction Aware Hover
    $(function () {
        var items = $('.item-somework'),
            descr = $('.description-somework'),
            pageX_pre = 0,
            pageY_pre = 0,
            pageX,
            pageY,
            dirs = {
                b : {
                    top: 710,
                    left: 0,
                    o: "t"
                },
                t : {
                    top: -710,
                    left: 0,
                    o: "b"
                },
                r : {
                    top: 0,
                    left: 710,
                    o: "l"
                },
                l : {
                    top: 0,
                    left: -710,
                    o: "r"
                }
            },
            dir;



        function direction(pageX_pre, pageY_pre, pageX, pageY) {
            // console.log((pageX - pageX_pre), (pageX - pageX_pre));
            if(~~(pageX - pageX_pre) == 0) {
                if(pageY > pageY_pre) {
                    dir = "b";
                }
                else {
                    dir = "t";
                }
            }
            if(~~(pageY - pageY_pre) == 0) {
                if(pageX > pageX_pre) {
                    dir = "r";
                }
                else {
                    dir = "l";
                }
            }


        }
    //    console.log(dirs[dirs["b"].o].top);
        function animation(item, status, dir) {
            if(status == "in") {
                item.animate({
                    top: -dirs[dir].top,
                    left: -dirs[dir].left
                }, 0, function() {
                    item.stop().animate({
                        top: 0,
                        left: 0
                    })
                });
            }
            if(status == "out") {

                item.animate({
                    top: 0,
                    left: 0
                }, 0, function() {
                    item.stop().animate({
                        top: -dirs[dir].top,
                        left: -dirs[dir].left
                    }, 400, "swing")
                });
            }
        }
        items.each(function (index){
            var item =  $(this);
                
            item.hover(function (e) {
                pageY =  Math.floor($(this).offset().top) - 3656;
                pageX =  Math.floor($(this).offset().left);
                direction(pageX_pre, pageY_pre, pageX, pageY);
                console.log(dir);
                console.log(pageX_pre, pageY_pre, pageX, pageY);
                animation(descr.eq(index),"in", dir);


                pageX_pre = pageX;
                pageY_pre = pageY;
            }, function (e) {
                pageY =  Math.floor($(this).offset().top) - 3656;
                pageX =  Math.floor($(this).offset().left);
                direction(pageX_pre, pageY_pre, pageX, pageY);
                animation(descr.eq(index),"out", dir);
                pageX_pre = pageX;
                pageY_pre = pageY;
            });
        })
    })

    
})(jQuery);