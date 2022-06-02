$(window).ready(function () {

    let height = $('.wrap_task:last-child .time').offset().top - $('.wrap_task:nth-child(2) .time').offset().top;
    $('.app_line').css("height", height);

    $(window).resize(function () {
        if (app.breakpoint == 'app') {
            let height = $('.wrap_task:last-child .time').offset().top - $('.wrap_task:nth-child(2) .time').offset().top;
            $('.app_line').css("height", height);
        }
    })

})

// if schedule_date == today , jump to the next of the last done task
window.onload = function () {
    var schedule_date = app.now_date.replace('年', '-').replace('月', '-').replace('日', '')
    if (schedule_date == app.today) {
        var last = document.getElementsByClassName("wrap_task--done");
        if (last.length !== 0) {
            if (app.breakpoint == 'web') {
                window.scroll(0, last[last.length - 1].offsetTop + 40)
            } else {
                window.scroll(0, last[last.length - 1].offsetTop + 90)
            }
        }
    }
}