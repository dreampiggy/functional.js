//Define
function curry(origin, func) {
	var f = origin;
	return function() {
		var args = Array.prototype.slice.call(arguments);
		return f.apply(this, func(args));
	};
}

// Inject into function prototype
// Function.prototype.curry = function (func) {
// 	var f = this;	//this scope to apply arg
// 	return function () {
// 		var args = Array.prototype.slice.call(arguments);	//arguments of func
// 		return f.apply(this, func(args));	//f call func with default arguments
// 	};
// }

module.exports = curry;