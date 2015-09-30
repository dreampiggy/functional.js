function delay(func) {
	var result;
	var isEvaluated = false;
	return function () {
		if (!isEvaluated)
			result = func();
		return result;
	};
}
function force(promise) {
	return promise();
}
function cons(car, cdr) {
	return [car, cdr];
}
function next(n) {
	return cons(n, delay(function () {return next(n + 1);}));
}
function head(stream) {
	return stream[0];
}
function tail(stream) {
	return force(stream[1]);
}

var stream = next(0);
console.log(stream);//[]
console.log(head(tail(tail(stream))));//2