var curry = require('./curry');
//Use by invoking
var multiply = function (a, b) {
	return a * b;
}
var double = curry(multiply, function (args) {
	args.push(2);	//which means multiply(2, x)
	return args;
});

//Use by function prototype
var square = multiply.curry(function (args) {
	args.push(args[0]);	//which means multiply(x, x)
	return args;
})
console.log(multiply(3, 4));//12
console.log(double(3));//6
console.log(square(4));//16