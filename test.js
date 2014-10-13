var wrong = require('./index');
var _ = require('lodash');
var should = require('should');

describe('wrong', function () {
	describe('#buildValidator(objectRules)', function () {
		it('should stop on required validator', function (done) {
			var validate = wrong.buildValidator({email: ['required', 'email'] });
			validate({email: undefined}).then(
				function (obj) {
				},
				function (err) {
					err.should.have.property('errors');
					err.errors.should.have.property('email', 'Обязательноe поле');
					err.errors.should.not.have.property('email', 'Неверный формат email адреса');
				}
			).done(done, done);
		});
	});
});
