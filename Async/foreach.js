ForEach = function (array, eachFunc, doneFunc) {
	if (!(array instanceof Array) || array.length === 0 || !(eachFunc instanceof Function)) {
		return;	//Empty or wrong arg
	}
	var i = -1;
	var len = array.length;
	
	(function next(result) {
		var async;	
		var abort = (result === false);	//Flag to early abort the foreach call
		
		do {
			++i;
		} while (!(i in array) && i !== len);
		
		if (abort || i === len) {
			doneFunc();
			return;
		}
		
		//Once call async() will return a next function
		//call this next function will continue the foreach async call
		//or set next(false) to early abort;
		result = eachFunc.call({
			async: function () {	
				async = true;
				return next;
			}
		}, array[i], i, array);		//call with this and currentValue, index, array
		
		if (!async) {	//not call async() just use sync and process next item
			next(result);
		}
	})();
}

module.exports = ForEach;