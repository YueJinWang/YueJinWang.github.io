
// Gotop

scroll_height = document.body.scrollHeight;

$(document).ready(function () {

    // document's height > 900
    if (scroll_height < 900) {
        $(".btn__gotop").css("display", "none");
    } else {
        $(".btn__gotop").addClass("hide");
    }

    // gotop
    $(".btn__gotop").click(function (e) {
        e.preventDefault();
        $("html,body").animate({
                scrollTop: 0,
            },
            150
        );
    });
});


$(window).scroll(function () {
    var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();

    // avoid footer
    if (scrollBottom < 240) {
        $(".btn__gotop").css("bottom", "232px");

    } else {
        $(".btn__gotop").css("bottom", "36px");
    }

    // scroll > 200
    if ($(window).scrollTop() > 200) {
        if ($(".btn__gotop").hasClass("hide")) {
            $(".btn__gotop").toggleClass("hide");
        }
    } else {
        $(".btn__gotop").addClass("hide");
    }
});

