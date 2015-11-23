Y = function (f) {
	return (function (x) {
    	return f(function (y) {
      		return x(x)(y);
    	});
  	})(function (x) {
    	return f(function (y) {
      		return x(x)(y);
    	});
  	});
};

module.exports = Y;