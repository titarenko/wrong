var Q = require('q');
var _ = require('lodash');
var rules = require('./rules');

var arrayValidator = function (validator) {
	return function (value) {
		if (!_.isArray(value)) {
			return 'Ожидается коллекция объектов';
		}
		var value = _.find(value, validator);
		if (value) {
			return validator(value);
		}
	};
};

var existanceValidator = function (find, message) {
	message = message || 'Неверное значение поля';
	return function (id) {
		if (!id) {
			return message;
		}
		return find.call(this, id).then(function (object) {
			if (!object) {
				return message;
			}
		});
	}
};

var resolveValidator = function (alias) {
	return rules[alias];
};

var buildValidator = function (objectRules) {
	return function (data) {
		var context = this;

		if (!data) {
			throw new Error('Object under validation can\'t be null');
		}

		var promises = _.map(objectRules, function (aliases, field) {
			var value = data[field];

			if ((_.isNull(value) || _.isUndefined(value) ||
				(_.isArray(value) || _.isString(value)) && _.isEmpty(value)) && 
				aliases.indexOf('required') === -1) {
				return [];
			}

			var hasError = false;

			return aliases.map(function (alias) {
				var validator = resolveValidator(alias);
				if (!validator) {
					throw new Error('Can\'t find validator ' + alias);
				}
				var result = !hasError?validator.call(context, data[field], field, data):null;
				hasError = hasError || Boolean(result);
				return Q(result).then(function (error) {
					if (error) {
						return _.zipObject([field], [error]);
					}
				});
			});
		});

		return Q.all(_.flatten(promises)).then(function (errors) {
			errors = errors.filter(Boolean);
			if (errors.length) {
				throw { errors: _.assign.apply(undefined, errors) };
			}
			return data;
		});
	};
};

module.exports = {
	rules: rules,
	buildValidator: buildValidator,
	arrayValidator: arrayValidator,
	existanceValidator: existanceValidator
};
