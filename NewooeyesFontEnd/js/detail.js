(function ($) {
    var infoIdTopMap = {};
    var infoTops = [];
    $(window).scroll(function (event) {
        var scrollTop = $(window).scrollTop();
        if (scrollTop >= 92) {
            if ($(".infos").css('position') != 'fixed') {
                $(".infos").css({'position': 'fixed', 'top': 0});
            }
        } else {
            if ($(".infos").css('position') == 'fixed') {
                $(".infos").css({'position': '', 'top': 92});
            }
        }
        if (scrollTop <= infoTops[3]) {
            if (scrollTop <= infoTops[1]) {
                if (scrollTop <= infoTops[0]) {
                    $(".infos .active").removeClass('active');
                    $($(".info")[0]).addClass('active');
                } else {
                    $(".infos .active").removeClass('active');
                    $($(".info")[1]).addClass('active');
                }
            } else {
                if (scrollTop <= infoTops[2]) {
                    $(".infos .active").removeClass('active');
                    $($(".info")[2]).addClass('active');
                } else {
                    $(".infos .active").removeClass('active');
                    $($(".info")[3]).addClass('active');
                }
            }
        } else {
            if (scrollTop <= infoTops[5]) {
                if (scrollTop <= infoTops[4]) {
                    $(".infos .active").removeClass('active');
                    $($(".info")[4]).addClass('active');
                } else {
                    $(".infos .active").removeClass('active');
                    $($(".info")[5]).addClass('active');
                }
            } else {
                if (scrollTop <= infoTops[6]) {
                    $(".infos .active").removeClass('active');
                    $($(".info")[6]).addClass('active');
                } else {
                    $(".infos .active").removeClass('active');
                    $($(".info")[7]).addClass('active');
                }
            }
        }
    });

    $(".info").click(function () {
        var $this = $(this);
        var index = $(".info").index($this);
        var scrollTop = infoTops[index];
        $("html, body").animate({scrollTop: scrollTop - 70}, 500);
        return false;
    });

    setTimeout(function () {
        $('section').each(function (val, section) {
            infoTops.push($('#' + section.id).position().top);
            infoIdTopMap[$('#' + section.id).position().top] = section.id;
        });
    }, 300);
})(jQuery);