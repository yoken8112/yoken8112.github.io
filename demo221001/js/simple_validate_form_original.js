// REF https://stackoverflow.com/questions/8597595/can-you-trigger-custom-html5-form-errors-with-javascript
var simpleValidateForm = function (formObjId) {
    this.validateFieldName = [
        // ['nameEnglishFirst',['text', '請填入您的英文名字'] ,'require_if_no', 'nameChineseFirst'],
        // ['nameEnglishLast',['text', '請填入您的英文姓氏'],'require_if_no', 'nameChineseLast'],
        // ['nameChineseFirst',['text', '請填入您的中文名字'],'require_if_no', 'nameEnglishFirst'],
        // ['nameChineseLast',['text', '請填入您的中文姓氏'],'require_if_no', 'nameEnglishLast'],
        // ['YourGender',['select','請選擇您的性別'],'',''],
        // ['mobile',['text', '請填寫您的行動電話號碼'],'required', ''],
        // ['email',['text', '請填入您的電子郵件信箱'],'required', ''],
        // ['askCourse',['checkbox','請填入您想要詢問的課程'],'',''],
        // ['comment',['textarea','請問您想問的問題內容'],'',''],
        // ['csrf_token',['hidden', ''],'',''],
        // ['fpid',['hidden', ''],'',''],
        // ['refer',['hidden', ''],'',''],
        // ['g-recaptcha-response',['hidden', ''],'',''],
    ];
    this.inited = false;
    this.formId = formObjId;
    this.formObj = null;
    this.validated = false;

    this.setValidateHandler = function () {
        // console.log('run setValidateHandler');
        var _this = this;

        this.validateFieldName.forEach(function (obj) {
            var targetInputElm = document.querySelector('[name^="' + obj[0] + '"');
            var refInputElm = document.querySelector('[name^="' + obj[3] + '"');

            if (obj[2] == 'required') {
                targetInputElm.required = true;
                targetInputElm.setAttribute('required', 'required');
            } else if (obj[2] == 'require_if_no') {
                targetInputElm.classList.remove('is-invalid');
                refInputElm.classList.remove('is-invalid');

                if (refInputElm.value == '' && targetInputElm.value == '') {
                    targetInputElm.required = true;
                    targetInputElm.setAttribute('required', 'required');
                    refInputElm.required = true;
                    refInputElm.setAttribute('required', 'required');
                } else {
                    targetInputElm.required = false;
                    targetInputElm.removeAttribute('required');
                    refInputElm.required = false;
                    refInputElm.removeAttribute('required');
                }
            }
        });
    };

    this.updateEventListener = function () {
        // console.log('run updateEventListener');
        var _this = this;

        // add html5 invalide event listener
        if (this.formObj.dataset.bindedValidationEvent == void 0) {
            this.validateFieldName.forEach(function (obj) {
                var targetInputElm = document.querySelector('[name^="' + obj[0] + '"');
                var refInputElm = document.querySelector('[name^="' + obj[3] + '"');

                targetInputElm.addEventListener('invalid', function (e) {
                    e.target.setCustomValidity('');
                    _this.doValidateErrorHandler(_this.formId, obj[1][0], obj[0], obj[3], obj[1][1]);
                    e.target.classList.add('is-invalid');
                });

                targetInputElm.addEventListener('blur', function (e) {
                    // console.log(e);
                    e.target.classList.remove('is-invalid');
                    _this.setValidateHandler();

                    if (!_this.validated) return;
                    _this.formObj.checkValidity();
                });

                targetInputElm.addEventListener('change', function (e) {
                    // console.log(e);
                    e.target.classList.remove('is-invalid');
                    _this.setValidateHandler();

                    if (!_this.validated) return;
                    _this.formObj.checkValidity();
                });
            });

            _this.formObj.setAttribute('data-binded-validation-event', 'true');
        } else {
            console.log('updateEventListener is ready.');
        }
    }

    this.doValidateErrorHandler = function (formId, type, inputId, refId, typeFailMsg) {
        // console.log(formId+", "+type+", "+inputId+", "+refId);
        var targetInputElm = document.querySelector('[name^="' + inputId + '"');
        // var refInputElm = document.querySelector('[name^="'+refId+'"');

        switch (type) {
            case 'text':
                if (targetInputElm.required) {
                    if (targetInputElm.value == '') {
                        targetInputElm.setCustomValidity(typeFailMsg);
                    } else {
                        targetInputElm.setCustomValidity('');
                    }
                }
                break;
            case 'select':
                if (targetInputElm.required) {
                    if (targetInputElm.value == '') {
                        targetInputElm.setCustomValidity(typeFailMsg);
                    } else {
                        targetInputElm.setCustomValidity('');
                    }
                }
                break;
            case 'checkbox':
                if (targetInputElm.required) {
                    if (targetInputElm.value == '') {
                        targetInputElm.setCustomValidity(typeFailMsgd);
                    } else {
                        targetInputElm.setCustomValidity('');
                    }
                }
                break;
            case 'textarea':
                if (targetInputElm.required) {
                    if (targetInputElm.value == '') {
                        targetInputElm.setCustomValidity(typeFailMsgd);
                    } else {
                        targetInputElm.setCustomValidity('');
                    }
                }

                break;
        }
    };

    this.getFormValidateResult = function () {
        this.validated = true;
        return this.formObj.reportValidity();
    }

    this.init = function () {
        // console.log('run init');

        var _this = this;

        document.addEventListener('DOMContentLoaded', function () {
            // console.log(_this);
            try {
                if (_this.validateFieldName.length == 0) {
                    throw "Validation target input field is not defined.";
                }

                if (_this.formId == '') {
                    throw "Validation target form is not defined.";
                }

                if (!_this.inited) {
                    _this.inited = true;
                    _this.formObj = document.querySelector('#' + _this.formId);
                    _this.setValidateHandler();
                    _this.updateEventListener();
                }
            } catch (e) {
                console.log(e);
            }
        });
    }
};