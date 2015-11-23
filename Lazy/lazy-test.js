var Lazy = require('./lazy');

function range(n) {
	var r = [];
	for(var i = 0;i < n;i++) r.push(i);
	return r;
}
var range = range(10);

//None-Lazy range
range.filter(function (e) {
		return e % 2 == 0
	})
	.map(function (e) {
		return e * 2;
	})
	.forEach(function (e) {
		console.log(e);
	})

//Lazy range
Lazy.range(10).filter(function (e) {
		return e % 2 == 0
	})
	.take(5)
	.map(function (e) {
		return e * 2;
	})
	.forEach(function (e) {
		console.log(e);
	});