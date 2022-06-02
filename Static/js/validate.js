$(document).ready(function () {

    $('.CheckDisabled').on("focusin", function () {
        $(this).prop('disabled', true);
    });

    $('.CheckDisabled').on("focusout", function () {
        $(this).prop('disabled', false);
    });

    $("#form").validate({
        onkeyup: false,
        onclick: false,
        onfocusout: false,

        submitHandler: function (form) {

            if ($('.wrap__popup_complete')) {
                app.overlay = true;
                form.submit();
            } else {
                form.submit();
            }

        },
        errorPlacement: function (error, element) {

            if (element.closest('.form__group').children('label.error').length == 0) {
                element.closest('.form__group').append(error);
            } else {
                if (element.closest('.form__group').children('label.error').css('display') === 'none') {
                    element.closest('.form__group').append(error);
                }
            }
        },

    });


    // Error Message
    jQuery.extend(jQuery.validator.messages, {
        required: "入力されていません。",
        email: "メールアドレスが正しくありません。",
        number: "数字で入力してください。",
        equalTo: "同じ値を入力してください。",
        url: "有効なURLではありません。",
    });



    // Error Rule
    jQuery.validator.addMethod("CheckPassword", function (value, element) {
        var str = value;
        var result = false;

        if (str.length > 0) {
            var patt = /^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])|(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9])|(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])|(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])).{8,32}|(?:(?=.*[A-Z])(?=.*[a-z])|(?=.*[A-Z])(?=.*[0-9])|(?=.*[A-Z])(?=.*[^A-Za-z0-9])|(?=.*[a-z])(?=.*[0-9])|(?=.*[a-z])(?=.*[^A-Za-z0-9])|(?=.*[0-9])(?=.*[^A-Za-z0-9])|).{8,32}$/;
            var result1 = patt.test(str);
            //english
            var pattEN = /[a-zA-Z]{1,}/;
            result2 = pattEN.test(str);
            //number
            var pattDigit = /[0-9]{1,}/;
            result3 = pattDigit.test(str);

            if (result1 == true && result2 == true && result3 == true) {
                result = true;
            } else {
                result = false;
            }
        } else {
            result = true;
        }
        return result;
    }, "半角英数字8～32文字で入力してください。");

    jQuery.validator.addMethod("CheckSelect", function (value, element) {
        var option = value;
        var result = false;

        if (option == 0 || option == '' || option == '__None') {
            result = false
        } else {
            result = true
        }

        return result;
    }, "入力されていません。");

    jQuery.validator.addMethod("CheckDisabled", function (value, element) {
        var str = value;
        var result = false;

        if (str) {
            var result = true;
        } else {
            var result = false;
        }

        return result;
    }, "入力されていません。");



    jQuery.validator.addMethod("CheckEmailAgain", function (value, element) {
        var str = value;
        var result = false;


        if (str == $('#entry_email_first').val()) {
            var result = true;
        } else {
            var result = false;
        }

        return result;

    }, "同じメールアドレスを入力してください。");

    jQuery.validator.addMethod("CheckPasswordAgain", function (value, element) {
        var str = value;
        var result = false;


        if (str == $('#entry_password_first').val()) {
            var result = true;
        } else {
            var result = false;
        }

        return result;

    }, "同じメールアドレスを入力してください。");

    jQuery.validator.addMethod("CheckDateStart", function (value, element) {
        var str = value;
        var result = false;

        var today = moment(this.calendar).format('YYYY-MM-DD');

        if ($('#start_time').val() >= today) {
            var result = true;
        } else {
            var result = false;
        }

        return result;

    }, "開始日が正しくありません");

    jQuery.validator.addMethod("CheckDateEnd", function (value, element) {
        var str = value;
        var result = false;

        if ($('#start_time').val() <= $('#end_time').val()) {
            var result = true;
        } else {
            var result = false;
        }

        return result;

    }, "終了日が開始日より前です。");


    jQuery.validator.addMethod("CheckPhoto", function (value, element) {
        var result = false;

        if ($('.btn__camera--photo').length == 0) {
            var result = false;
        } else {
            var result = true;
        }

        return result;

    }, "入力されていません。");


    jQuery.validator.addMethod("CheckWeek", function (value, element) {
        var result = false;

        var flag_week = false;
        $('.checkbox').each(function (i, ele) {
            if (ele.checked == true) {
                flag_week = true;
            }
        })

        if (flag_week == false) {
            $('#week-error').addClass('active');
            var result = false;
        } else {
            $('#week-error').removeClass('active');
            var result = true;
        }
        $('.checkbox monday::before').css('content', '')

        return result;

    }, "入力されていません。");

    jQuery.validator.addMethod("CheckProdSpec", function (value, element) {
        var result = false;

        if (app.prod_spec.length == 0) {
            $('#prod_spec-error').addClass('active');
            $('.wrap__content--add').addClass('active');
            var result = false;
        } else {
            $('#prod_spec-error').removeClass('active');
            $('.wrap__content--add').removeClass('active');
            var result = true;
        }

        return result;

    }, "");

    jQuery.validator.addMethod("CheckJapanPrice", function (value, element) {
        var result = false;

        if ($('.select__area').val() == 2 || $('.select__area').val() == 3) {
            for (var i = 0; i < app.prod_spec.length; i++) {
                if (app.prod_spec[i].japan_price == 0) {
                    $('#japan-error').addClass('active');
                    $('.wrap__content--table').addClass('active');
                    var result = false;

                } else {
                    $('#japan-error').removeClass('active');
                    $('.wrap__content--table').removeClass('active');
                    var result = true;

                }
            }
        }

        return result;

    }, "");

});