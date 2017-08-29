/* -----------------------------------------------Скрипт для формы валидации ----------------------------- */

/* ----------------------------
 Настройки шаблона ввода телефона
 ---------------------------- */
window.addEventListener("DOMContentLoaded", function() {
    function setCursorPosition(pos, elem) {
        elem.focus();
        if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
        else if (elem.createTextRange) {
            let range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select()
        }
    }
    function mask() {
        let matrix = this.defaultValue,
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, "");
        def.length >= val.length && (val = def);
        matrix = matrix.replace(/[_\d]/g, function(a) {
            return val.charAt(i++) || "_"
        });
        this.value = matrix;
        i = matrix.lastIndexOf(val.substr(-1));
        i < matrix.length && matrix != this.defaultValue ? i++ : i = matrix.indexOf("_");
        setCursorPosition(i, this)
    }
    let input = document.getElementById("tel");
    input.addEventListener("input", mask, false)
});
/* ----------------------------
 Form validation
 ---------------------------- */
function CustomValidation(input) {
    this.invalidities = [];
    this.validityChecks = [];
    this.inputNode = input;
    this.registerListener();
}
CustomValidation.prototype = {
    addInvalidity: function(message) {
        this.invalidities.push(message);
    },
    getInvalidities: function() {
        return this.invalidities.join('. \n');
    },
    checkValidity: function(input) {
        for ( let i = 0; i < this.validityChecks.length; i++ ) {
            let isInvalid = this.validityChecks[i].isInvalid(input);
            if (isInvalid) {
                this.addInvalidity(this.validityChecks[i].invalidityMessage);
            }
            let requirementElement = this.validityChecks[i].element;
            if (isInvalid) {
                requirementElement.classList.add('invalid');
                requirementElement.classList.remove('valid');
            } else {
                requirementElement.classList.remove('invalid');
                requirementElement.classList.add('valid');
            }
        }
    },
    checkInput: function() {
        this.inputNode.CustomValidation.invalidities = [];
        this.checkValidity(this.inputNode);
        if ( this.inputNode.CustomValidation.invalidities.length === 0 && this.inputNode.value !== '' ) {
            this.inputNode.setCustomValidity('');
        } else {
            let message = this.inputNode.CustomValidation.getInvalidities();
            this.inputNode.setCustomValidity(message);
        }
    },
    registerListener: function() {
        let CustomValidation = this;
        this.inputNode.addEventListener('change', function() {
            CustomValidation.checkInput();
        });
    }
};
const usernameValidityChecks = [
    {
        isInvalid: function(input) {
            let illegalCharacters = input.value.match(/^[А-Яа-я]+\s[А-Яа-я]+/u);
            return !illegalCharacters;
        },
        invalidityMessage: 'Поле должно содержать буквы только русского алфавита',
        element: document.querySelector('label[for="username"] .input-requirements li:nth-child(1)')
    },
    {
        isInvalid: function(input) {
            let illegalCharacters = input.value.match(/\s[А-Яа-я]+/);
            return !illegalCharacters;
        },
        invalidityMessage: 'Слова должны быть разделены пробелом',
        element: document.querySelector('label[for="username"] .input-requirements li:nth-child(2)')
    }
];
const EmailValidityChecks = [
    {
        isInvalid: function(input) {
            let illegalCharacters = input.value.match(/^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/);
            return !illegalCharacters;
        },
        invalidityMessage: 'Введите валидный E-mail',
        element: document.querySelector('label[for="Email"] .input-requirements li:nth-child(1)')
    },
];
const TelValidityChecks = [
    {
        isInvalid: function(input) {
            let illegalCharacters = input.value.match(/\+375\s\(\d{2}\)\s\d{3}\-\d{2}\-\d{2}/);
            return !illegalCharacters;
        },
        invalidityMessage: 'Введите правильный номер',
        element: document.querySelector('label[for="tel"] .input-requirements li:nth-child(1)')
    },
];
/* ----------------------------
 Настройки CustomValidation
 ---------------------------- */
const usernameInput = document.getElementById('username');
const EmailInput = document.getElementById('Email');
const TellInput = document.getElementById('tel');

usernameInput.CustomValidation = new CustomValidation(usernameInput);
usernameInput.CustomValidation.validityChecks = usernameValidityChecks;

EmailInput.CustomValidation = new CustomValidation(EmailInput);
EmailInput.CustomValidation.validityChecks = EmailValidityChecks;

TellInput.CustomValidation = new CustomValidation(TellInput);
TellInput.CustomValidation.validityChecks = TelValidityChecks;

/* ----------------------------
 Event Listeners
 ---------------------------- */

const inputs = document.querySelectorAll('input:not([type="submit"])');
const submit = document.querySelector('input[type="submit"');
const form = document.getElementById('registration');

function validate() {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].CustomValidation.checkInput();
    }
}


submit.addEventListener('click', validate);
form.addEventListener('submit', validate);
