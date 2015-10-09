var Optional = require('./optional');
//Use
var op = new Optional(1);

op.present(function (value) {
	console.log(value);//1
});

var result = op.map(function (value) {
	return ++value;
}).map(function (value) {
	return value *= 2;
}).filter(function (value) {
	return value === 4 ? true : false;
}).flatMap(function (value) {
	return new Optional(value);
});

if (result.empty()) {
	result.or(0);
}
console.log(result.get());//4