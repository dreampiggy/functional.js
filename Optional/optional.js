//Define
Optional = function () {
	this.value = arguments[0];
}
Optional.prototype.get = function () {
	if (isNull(this.value)){
		throw new Error("Optional is null");
	}
	return this.value;
}
Optional.prototype.empty = function () {
	return isNull(this.value);
}
Optional.prototype.present = function (func) {
	if (!isNull(this.value)){
		if (!isFunction(func)){
			throw new Error("Present arg is not a function");
		}
		func(this.value);
	}
}
Optional.prototype.filter = function (func) {
	if (!isFunction(func)){
		throw new Error("Filter arg is not a function");
	}
	if (func(this.value)) {
		return new Optional(this.value);
	}
	return new Optional();
}
Optional.prototype.map = function (func) {
	if (!isFunction(func)){
		throw new Error("Map arg is not a function");
	}
	if (isNull(this.value)){
		return new Optional();
	}
	var value = func(this.value);
	return isNull(value) ? new Optional() : new Optional(value);
}
Optional.prototype.flatMap = function (func) {
	if (!isFunction(func)){
		throw new Error("FlatMap arg is not a function");
	}
	if (isNull(this.value)){
		return new Optional();
	}
	var value = func(this.value);
	if (isNull(value) || isNull(value.get)){
		throw new Error('FlatMap function does not return an Optional');
	}
	return value;
}
Optional.prototype.or = function (other) {
	return isNull(this.value) ? other : this.value;
}
function isNull(value) {
	return value === undefined || value === null ? true : false;
}

function isFunction(func) {
	return typeof func === 'function' ? true : false;
}

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