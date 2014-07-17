# wrong

Another JS object validation module with focus on simplicity.

# API

## buildValidator(rules)

Builds function which promises validation errors for given object.

```js
var validate = buildValidator({
	name: ['required'],
	cash: ['required', 'positive number']
});

var user = {
	name: '',
	cash: -10
};

validate(user).then(function (errors) {
	console.log('User is not valid!', errors);
});
```

## rules

Contains hash of rules: key is name, value is validation function.

Validation function has following signature: `function (value, fieldName, wholeObject)`. It must promise error or return nothing if value is valid. Note: context (`this`) of validate function will be applied to each field validator, so you can use it to pass additional information, like current user.

## arrayValidator(itemValidator)

Constructs array value validator by taking item validator as parameter.

# License

BSD
