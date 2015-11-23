Promisify = function (func, flag) {
	if (func === undefined || typeof func !== 'function') {
		throw new Error('Exception: Promisify arg must be a function');
	} 
	return function() {
		var self = this;
		var args = Array.prototype.slice.call(arguments);
		if (flag === true){	//swap err and result
			return new Promise(function (reject, resolve) {
				args.push(function (err,result) {
					if(err) reject(err);
					else resolve(result);
				});
				func.apply(self,args);
			});
		}
		else {
			return new Promise(function (resolve, reject) {
				args.push(function (err,result) {
					if(err) reject(err);
					else resolve(result);
				});
				func.apply(self,args);
			});
		}
	}
}

module.exports = Promisify;