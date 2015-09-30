//Define
Function.prototype.curry = function (func) {
	var f = this;
	return function () {
		var args = Array.prototype.slice.call(arguments, 0);
		return f.apply(this, func(args));
	};
}

//Use
var multiply = function (a, b) {
	return a * b;
}
var double = multiply.curry(function (args) {
	args.push(2);
	return args;
});
var square = multiply.curry(function (args) {
	args.push(args[0]);
	return args;
})
console.log(multiply(3, 4));//12
console.log(double(3));//6
console.log(square(4));//16