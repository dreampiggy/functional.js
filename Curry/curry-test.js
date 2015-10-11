var curry = require('./curry');
//Use
var multiply = function (a, b) {
	return a * b;
}
var double = curry(multiply, function (args) {
	args.push(2);
	return args;
});
var square = curry(multiply, function (args) {
	args.push(args[0]);
	return args;
})
console.log(multiply(3, 4));//12
console.log(double(3));//6
console.log(square(4));//16