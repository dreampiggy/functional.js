//Simple fibonacci
var F = function F(n) {
  return n == 0 ? 1 : n * F(n - 1);
};

console.log(F(5))	//120


//Reduce inline `F` using JavaScript callee

var F = function F(n) {
  return n == 0 ? 1 : n * arguments.callee(n - 1)
};

console.log(F(5))	//120


//Reduce inline `F` using lambda

var F = function F(f) {
	return function (n) {
		return n == 0 ? 1 : n * f(f)(n - 1)
		//first call f will generate a function with `n` as args, then eval
	}
}

console.log(F(F)(5))	//120


//Reduce all using Y combinator, which meas replace first `F` with lambda

console.log(
	function (f) {
		return function (n) {
			return n == 0 ? 1 : n * f(f)(n - 1)
		}
	}(function (f) {
		return function (n) {
			return n == 0 ? 1 : n * f(f)(n - 1)
		}
	})(5)	//120
)


//So now we have a pure function with no name -> pure lambda
//We can conclude that how to generate a recursion lambda :

function lambda(f) {
	return function (args) {
		//return what your recursion body will return
	}(function (f) {
		return function (args) {
			//return what your recursion body will return
		}
	})
}('args')


//And finally we build a `Y-combinator`

var Y = require("./y")
var fibonacci = Y(function(f) {
	return function(n) {
		return n == 0 ? 1 : n * f(n - 1);
	}
})
console.log(fibonacci(5))