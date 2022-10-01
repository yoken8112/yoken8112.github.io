var scrollToPos, submitContactUsForm, recaptchaInited = false,
    grec_public_key = '6LfqXcUUAAAAAKo-s4047w0_nifG8y6-tAIbb9WP',
    // grec_public_key = '6LfVhXgeAAAAAM4LDWtbGmRHdMK1fNd1VVtPQZj-',
    formSubmitUrl = 'https://www.ieltstaipei.com/api/getContactUsForm';
// formSubmitUrl = 'https://teach.test/api/getContactUsForm';
// formSubmitUrl = './getContactUsFormV2.php'

function appearOtherCourses() {
    var otherCoursesButtonElement = document.getElementById("otherCoursesButton");
    var element = document.getElementById("otherCourses");
    element.classList.remove("d-none");
    otherCoursesButtonElement.classList.add("d-none");
}

// do simple validate form
simpleValidate = new simpleValidateForm('contactUsForm');
simpleValidate.validateFieldName = [
    ['nameEnglishFirst', ['text', '請填入您的英文名字'], 'require_if_no', 'nameChineseFirst'],
    ['nameEnglishLast', ['text', '請填入您的英文姓氏'], 'require_if_no', 'nameChineseLast'],
    ['nameChineseFirst', ['text', '請填入您的中文名字'], 'require_if_no', 'nameEnglishFirst'],
    ['nameChineseLast', ['text', '請填入您的中文姓氏'], 'require_if_no', 'nameEnglishLast'],
    ['YourGender', ['select', '請選擇您的性別'], '', ''],
    ['mobile', ['text', '請填寫您的行動電話號碼'], 'required', ''],
    ['email', ['text', '請填入您的電子郵件信箱'], 'required', ''],
    ['askCourse', ['checkbox', '請填入您想要詢問的課程'], '', ''],
    ['comment', ['textarea', '請問您想問的問題內容'], '', ''],
    ['csrf_token', ['hidden', ''], '', ''],
    ['fpid', ['hidden', ''], '', ''],
    ['refer', ['hidden', ''], '', ''],
    ['g-recaptcha-response', ['hidden', ''], '', ''],
];
simpleValidate.init();


// contact us form.
document.addEventListener('DOMContentLoaded', function () {

    // prevent hide again.
    $('#collapseContactUs').on('hide.bs.collapse', function (e) {
        e.preventDefault();
    });
    // $('#systemInfo').on('hidden.bs.modal', function(){
    //     $('#collapseContactUs').collapse('hide');
    // });
    window.scrollToPos = function (id) {
        if (typeof $('#' + id).offset().top == 'undefined') return;
        // console.log($('#'+id).offset().top);

        window.initReCaptcha();

        // $('#promo-banner-modal').modal('hide');
        $('html, body').animate({
            scrollTop: $('#' + id).offset().top
        }, '150', 'easeInOutQuad');
    }

    window.initReCaptcha = function () {
        // Loading google recaptcha on-demand.
        var _gr = document.createElement('script');
        _gr.onload = function () {
            window.grecaptcha.ready(function () {
                console.log('recaptcha ready!');
            });
        };
        _gr.src = 'https://www.google.com/recaptcha/api.js?render=' + grec_public_key;
        document.head.append(_gr);
    }

    window.initReCaptcha();

    var preventDlClick = false;
    // $('body').on('submit', '#contactUsForm', function (e) {
    //     e.preventDefault();
    window.submitContactUsForm = function () {

        if (!preventDlClick) {
            preventDlClick = true;
        } else {
            return;
        }

        if (!window.simpleValidate.getFormValidateResult()) {
            preventDlClick = false;
            return;
        }

        ge('contact_submit_start');

        var _close = document.querySelector('#model_close_btn');
        var _modal = document.querySelector('#systemInfo');

        _modal.querySelector('.modal-body').innerHTML = '<div style="height: 150px;"><svg class="circular" width="48px" height="48px"> <circle class="path-bg" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke="#eeeeee" /> <circle class="path" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke-miterlimit="10" stroke="#F96D00" /></svg></div>';
        _close.style.display = 'none';

        window.grecaptcha.execute(grec_public_key, {
            action: 'homepage'
        }).then(function (token) {
            $('#g-recaptcha-response').val(token);
            $('#refer').val(encodeURIComponent(window.location.href));

            var fpid = document.cookie.split('; ').find((row) => row.startsWith('fi='))?.split('=')[1] || false;
            var fphash = document.cookie.split('; ').find((row) => row.startsWith('uh='))?.split('=')[1] || false;

            var fpidInput = fpid ? `&fpid=${fpid}` : '';
            var fphashInput = fphash ? `&fphash=${fphash}` : '';

            $.ajax({
                url: window.formSubmitUrl,
                type: 'post',
                dataType: 'json',
                data: $('#contactUsForm').serialize() + fpidInput + fphashInput,
                success: function (data) {
                    preventDlClick = false;

                    _close.style.display = 'block';
                    console.log(data.status + " : " + data.desc);
                    if (data.status == 'OK') {
                        ge('contact_submit_finish');
                        // _modal.querySelector('.modal-body').innerText = '感謝您的留言，我們會在24小時內盡快與您連繫的！\n\nThank you for your inquiry, we\'ll contact you within 24 hours.';
                        _modal.querySelector('.modal-body').innerHTML = data.message;
                        // alert('感謝您的留言，我們會在24小時內盡快與您連繫的！\n\nWe already got your information, we\'ll contact you within 24 hours.');
                        // An comfirmation email has been sent to you, please click on the link to confirm your address and someone will contact you within 24 hours.
                        document.querySelector('#contactUsForm').reset();
                    } else if (data.status == 'ERR02') {
                        // _modal.querySelector('.modal-body').innerText = '請確定表單內容是否都有填寫正確？\n\nPlease fill out the required fields.';
                        _modal.querySelector('.modal-body').innerHTML = data.message;
                        // alert('請確定表單內容是否都有填寫正確？\n\nPlease check your information are correct or not.');
                    } else {
                        // _modal.querySelector('.modal-body').innerText = '訊息傳送失敗！' + data.status;
                        _modal.querySelector('.modal-body').innerHTML = data.message + data.status;
                        // alert('訊息傳送失敗！' + data.status);
                    }
                    // $('#systemInfo').modal('show');
                }
            });


            console.log(token);
        });

        $('#systemInfo').modal({
            backdrop: 'static',
            keyboard: false,
        });
        $('#systemInfo').modal('show');

    };

});