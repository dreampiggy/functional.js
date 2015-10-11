Lazy = function () {
	this.number = 0;
	this.genFunc = undefined;
}

Lazy.prototype.func = function (func) {
	var args = arguments;
	var cache;
	var lazy = func.bind.apply(func, args);
	return function () {
		if (cache !== undefined) {
			return cache;
		}
		else {
			cache = lazy();
			return cache;
		}
	}
}

Lazy.prototype.generate = function (genFunc) {
	
}

Lazy.prototype.take = function (n) {
	
}

Lazy.prototype.toArray = function () {
	var array = new Array(this.number);
	var genFunc = this.genFunc;
	array = array.map(genFunc);
	return array;
}

Lazy.prototype.each = function (eachFunc) {
	var calFunc = this.genFunc.
}

Lazy.prototype.list = function (array) {
	
}

Lazy.prototype.string = function () {
	
}

Lazy.prototype.seq = function () {
	
}

Lazy.prototype.function = function () {
	
}

Lazy.prototype.stream = function () {
	;
}

var lazy = new Lazy;

function bigSum(a, b) {
	var sleepTime = 1000; //assume calculate for 5s
	for(var start = Date.now(); Date.now() - start <= sleepTime; ) { } 
	return a+b;
}

var sum = lazy.func(bigSum, 1, 2);
console.log(sum());
console.log(sum());//memory value

function random (min, max) {
	return min + Math.floor(Math.random() * ((max-min) + 1));
}
var list = lazy.generate(function () {
	return random(1, 1000);
});

list.take(10).each(function (value) {
	value++;
	console.log(value);
}).each(function (value) {
	console.log(value);
}).toArray().forEach(function (value) {
	console.log(value);
});