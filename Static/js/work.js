$(document).ready(function () {

    $(document).on('click', '#submit_delivery', function (e) {
        AutoDone('.delivery');
        e.preventDefault();
    });

    $(document).on('click', '#submit_pickup', function (e) {
        AutoDone('.pickup');
        e.preventDefault();
    });

    function AutoDone(e) {
        app.overlay = true;
        let i;
        if (e == '.delivery') {
            i = 0;
            app.isDeliveryDone = true;
        } else {
            i = 1;
            app.isPickupDone = true;
        }

        app.windows[i].window.forEach((element, i) => {
            if (element.status == '__None') {
                element.status = 1;
                element.user_number = element.number;
                $(e + ' .status__result').eq(i).css('display', 'block');
                $(e + ' .status__btns').eq(i).hide();
                $(e + ' .status--wrong').eq(i).hide();
                setTimeout(() => {
                    $(e + ' .status--correct').eq(i).css('top', '0');
                }, 0);
            }
        });
    }

    function CheckIsDone(e) {
        let i;
        if (e == '.delivery') {
            i = 0;
        } else {
            i = 1;
        }

        let flag_done = true;
        app.windows[i].window.forEach((element, i) => {
            if (element.status == '__None') {
                flag_done = false;
            }
        })

        if (flag_done == true) {
            if (i == 0) {
                app.isDeliveryDone = true;
            } else {
                app.isPickupDone = true;
            }
        }
    }


    // correct
    $(document).on('click', '.status__btn--correct', function () {

        let i = $(this).parents('.wrap__item').index() - 2;
        let flag;

        if ($(this).parents('.wrap__item').hasClass('delivery')) {
            flag = '.delivery';
            app.windows[0].window[i].status = 1;
            app.windows[0].window[i].user_number = app.windows[0].window[i].number;
        } else {
            flag = '.pickup';
            app.windows[1].window[i].status = 1;
            app.windows[1].window[i].user_number = app.windows[0].window[i].number;
        }

        $(flag + ' .status__result').eq(i).css('display', 'block');
        $(flag + ' .status__btns').eq(i).hide();
        $(flag + ' .status--wrong').eq(i).hide();
        setTimeout(() => {
            $(flag + ' .status--correct').eq(i).css('top', '0');
        }, 0);

        CheckIsDone(flag);
    })

    // wrong
    // add '.edit' to distinguish edit or error popup
    $(document).on('click', '.order__edit', function () {
        $('.popup_error').addClass('edit')
    })

    // auto focus
    $(document).on('click', '.status__btn--wrong,.order__edit', function () {
        $(".user_number").focus();
    })


    $(document).on('keyup', '.user_number', function () {
        let i = $(this).parents('.wrap__item').index() - 2;
        let number;
        let user_number;
        let status;
        if ($(this).parents('.wrap__item').hasClass('delivery')) {
            number = app.windows[0].window[i].number;
            user_number = app.windows[0].window[i].user_number;
            status = app.windows[0].window[i].status;
        } else {
            number = app.windows[1].window[i].number;
            user_number = app.windows[1].window[i].user_number;
            status = app.windows[1].window[i].status;
        }

        if ($(this).val()) {

            // edit
            if ($(this).parents('.popup_error').hasClass('edit')) {
                if (status == 2 && Number($(this).val()) == number) {
                    // error -> correct
                    $(this).next('.error_submit').removeAttr('disabled');
                } else if (status == 1 && Number($(this).val()) == number) {
                    // correct -> correct
                    $(this).next('.error_submit').attr('disabled', 'disabled');
                } else if (Number($(this).val()) !== user_number && Number($(this).val()) !== 0) {
                    // error -> error || correct -> error
                    $(this).next('.error_submit').removeAttr('disabled');
                } else {
                    $(this).next('.error_submit').attr('disabled', 'disabled');
                }
            }
            // error
            else {
                if (Number($(this).val()) !== number && Number($(this).val()) !== 0) {
                    $(this).next('.error_submit').removeAttr('disabled');
                } else {
                    $(this).next('.error_submit').attr('disabled', 'disabled');
                }
            }
        } else {
            $(this).next('.error_submit').attr('disabled', 'disabled');
        }
    })

    $(document).on('click', '.error_submit', function () {
        let i = $(this).parents('.wrap__item').index() - 2;
        let flag;

        if ($(this).parents('.wrap__item').hasClass('delivery')) {
            flag = '.delivery';
        } else {
            flag = '.pickup';
        }
        let user = Number($('.user_number').val());

        let edit = false;
        if ($(this).parents('.popup_error').hasClass('edit')) {
            edit = true;
        } else {
            edit = false;
        }

        if (user) {
            // edit : wrong -> correct
            if (edit == true && flag == '.delivery' && user == app.windows[0].window[i].number) {
                app.windows[0].window[i].overlay_error = false;
                app.windows[0].window[i].user_number = user;
                app.windows[0].window[i].status = 1;

                $(flag + ' .status__result').eq(i).css('display', 'block');
                $(flag + ' .status__btns').eq(i).hide();
                $(flag + ' .status--correct').eq(i).show();
                $(flag + ' .status--wrong').eq(i).hide();
                setTimeout(() => {
                    $(flag + ' .status--correct').eq(i).css('top', '0');
                }, 0);
            } else if (edit == true && flag == '.pickup' && user == app.windows[1].window[i].number) {
                app.windows[1].window[i].overlay_error = false;
                app.windows[1].window[i].user_number = user;
                app.windows[1].window[i].status = 1;

                $(flag + ' .status__result').eq(i).css('display', 'block');
                $(flag + ' .status__btns').eq(i).hide();
                $(flag + ' .status--correct').eq(i).show();
                $(flag + ' .status--wrong').eq(i).hide();
                setTimeout(() => {
                    $(flag + ' .status--correct').eq(i).css('top', '0');
                }, 0);

            }

            // else
            else if (flag == '.delivery' && user !== app.windows[0].window[i].number) {
                app.windows[0].window[i].overlay_error = false;
                app.windows[0].window[i].user_number = user;
                app.windows[0].window[i].status = 2;

                $(flag + ' .status__result').eq(i).css('display', 'block');
                $(flag + ' .status__btns').eq(i).hide();
                $(flag + ' .status--correct').eq(i).hide();
                $(flag + ' .status--wrong').eq(i).css('display', 'flex');

            } else if (flag == '.pickup' && user !== app.windows[1].window[i].number) {
                app.windows[1].window[i].overlay_error = false;
                app.windows[1].window[i].user_number = user;
                app.windows[1].window[i].status = 2;

                $(flag + ' .status__result').eq(i).css('display', 'block');
                $(flag + ' .status__btns').eq(i).hide();
                $(flag + ' .status--correct').eq(i).hide();
                $(flag + ' .status--wrong').eq(i).css('display', 'flex');
            }



            CheckIsDone(flag);
        }
    })



    // map
    function Map() {
        latLng = {
            lat: app.lat,
            lng: app.lng,
        };
        var map = new google.maps.Map(document.getElementById('map'), {
            center: latLng,
            zoom: 16,
        });
        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            url: "https://www.google.com/maps/search/?api=1&query=" + app.lat + "," + app.lng,
        });

        google.maps.event.addListener(marker, 'click', function () {
            window.open(this.url);
        });
    }
    Map();


    // search box : scroll -> position fixed
    let sb_h_web = 0;
    let sb_h_app = 0;
    let sb_h = 0;

    $(window).scroll(function () {

        if (app.breakpoint == 'web') {
            if (sb_h_web == 0) {
                sb_h_web = $('.wrap__search_box').offset().top;
            }
            sb_h = sb_h_web;
        } else {
            if (sb_h_app == 0) {
                sb_h_app = $('.wrap__search_box').offset().top;
            }
            sb_h = sb_h_app;
        }

        let st_h = $(window).scrollTop() + $('.v-toolbar__content').height() + 8;

        if (app.mapShow == false) {

            if (st_h >= sb_h) {
                $('.wrap__search_box').addClass('fixed');
                $('.fixed_space').show();
            } else {
                $('.wrap__search_box').removeClass('fixed');
                $('.fixed_space').hide();
            }

        } else {

            if (st_h >= sb_h + $('#map').height()) {
                $('.wrap__search_box').addClass('fixed');
                $('.fixed_space').show();
            } else {
                $('.wrap__search_box').removeClass('fixed');
                $('.fixed_space').hide();

            }
        }

    })


    // search keyword
    $(document).on('keyup', '.keyword', function () {
        let keyword = $(this).val();
        let flag;

        if ($(this).hasClass('delivery')) {
            flag = '.delivery';
        } else {
            flag = '.pickup';
        }
        let result = [];

        $(flag + " .order_id").each(function (i, ele) {
            if ($(this).text().includes(keyword)) {
                result.push(true);
            } else {
                result.push(false);
            }
        });

        let position = result.indexOf(true);

        if (position > -1) {

            let target_height;
            if (app.breakpoint == 'web') {
                target_height = $(flag + ' .order_id').eq(position).offset().top - 180;
            } else {
                target_height = $(flag + ' .order_id').eq(position).offset().top - 138;
            }

            $('html,body').animate({
                scrollTop: target_height
            }, 50);


            // display prev & next
            let count = 0;
            for (var i = 0; i < result.length; i++) {
                if (result[i] == true) {
                    count += 1;
                }
            }
            if (keyword && count > 0) {
                $('.search_jump').css('display', 'flex');
            } else {
                $('.search_jump').css('display', 'none');
            }

        }


        // go next
        $(flag + '.go_next').unbind('click').on('click', function () {
            if (position > -1) {
                for (var i = position + 1; i < result.length; i++) {
                    if (result[i] == true) {
                        position = i;

                        let target_height;
                        if (app.breakpoint == 'web') {
                            target_height = $(flag + ' .order_id').eq(i).offset().top - 180;
                        } else {
                            target_height = $(flag + ' .order_id').eq(i).offset().top - 138;
                        }

                        $('html,body').animate({
                            scrollTop: target_height
                        }, 50);
                        return false;

                    }
                }
            }
        })

        // go prev
        $(flag + '.go_prev').unbind('click').on('click', function () {
            if (position > -1) {
                for (let i = position - 1; i > -1; i--) {
                    if (result[i] == true) {
                        position = i;

                        let target_height;
                        if (app.breakpoint == 'web') {
                            target_height = $(flag + ' .order_id').eq(i).offset().top - 180;
                        } else {
                            target_height = $(flag + ' .order_id').eq(i).offset().top - 138;
                        }

                        $('html,body').animate({
                            scrollTop: target_height
                        }, 50);
                        return false;

                    }
                }
            }
        })

    })

})