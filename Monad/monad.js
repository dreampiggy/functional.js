//Define
Monad = function() {
	this.value = arguments[0];
};
Monad.prototype.unit = function (value) {
	this.value = value;
	return this;
}
Monad.prototype.bind = function (func) {
	var value = func(this.value);
	var monad = new Monad(value);
	return monad;
}
Monad.prototype.extract = function () {
	return this.value;
}

module.exports = Monad;