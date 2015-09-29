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
	this.value = value;
	return this;
}
Monad.prototype.extract = function () {
	return this.value;
}

//Use
var monad = new Monad;
var monad = new Monad(10);

monad.unit(20);
monad.unit(new Monad(30));

monad.bind(function (value){return value});
monad.bind(function (value) {
	return value.extract() * 2;
})

var result = monad.extract();//60

//Test
var monad = new Monad;
monad.unit(10);

console.log(monad.extract());

var firstMonad = monad.bind(function (value) {
	return value / 2;
});

console.log(firstMonad.extract());

var secondMonad = monad.bind(function (value) {
	return value + 1;
}).bind(function (value) {
	return value + 2;
}).bind(function (value) {
	return value + 3;
});

console.log(secondMonad.extract());