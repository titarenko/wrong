var _ = require('lodash');
var moment = require('moment');

var email = function (value) {
	if (!value.match(/^\S@\S$/)) {
		return 'Неверный формат email адреса';
	}
};

var notEmpty = function (value) {
	if (_.isEmpty(value) && !_.isNumber(value) && !_.isBoolean(value)) {
		return 'Обязательноe поле';
	}
};

var phone = function (phone) {
	if (!phone.match(/^\+?[\d\s\-]+$/)) {
		return 'Неверный формат телефона';
	}
};

var skype = function (skype) {
	if (!skype.match(/^[\S]+$/)) {
		return 'Неверный формат Skype логина';
	}
};

var object = function (value) {
	if (!_.isObject(value)) {
		return 'Поле должно быть объектом';
	}
}

var positiveInt = function (number) {
	number = +number;
	if (isNaN(number) || number <= 0) {
		return 'Ожидается положительное число';
	}
};

var positiveIntOrZero = function(number) {
	number = +number;
	if (isNaN(number) || number < 0) {
		return 'Ожидается положительное число или ноль';
	}
};

var nonZeroInt = function(number) {
	number = +number;
	if (isNaN(number) || number === 0) {
		return 'Ожидается число отличное от нуля';
	}
};

var url = function (value) {
	if (!value.match(/^https?:\/\/\S+$/)) {
		return 'Неверный формат URL';
	}
};

var text = function (value) {
	if (!_.isString(value)) {
		return 'Поле должно иметь текстовый формат';
	}
};

var wmr = function(value) {
	if (!_.isString(value) ||value[0] != 'R' || value.length != 13) {
		return 'Неверный формат WMR кошелька';
	}
};

var httpMethod = function(value) {
	if (value != 'GET' && value != 'POST') {
		return 'Недопустимый HTTP метод';
	}
};

var date = function (value) {
	if (!_.isDate(value) || !moment(value).isValid()) {
		return 'Поле должно содержать дату';
	}
};

var positiveNumber = function (value) {
	value = parseFloat(value);
	if (isNaN(value) || value <= 0) {
		return 'Ожидается число больше нуля';
	}
};

module.exports = {
	'email': email,
	'not empty': notEmpty,
	'required': notEmpty,
	'skype': skype,
	'phone': phone,
	'object': object,
	'positive integer': positiveInt,
	'positive integer or zero': positiveIntOrZero,
	'non zero integer': nonZeroInt,
	'url': url,
	'text': text,
	'wmr': wmr,
	'http method': httpMethod,
	'date': date,
	'positive number': positiveNumber
};
