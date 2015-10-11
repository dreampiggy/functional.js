var ForEach = require('./foreach');
var fs = require('fs');
var arr = ['/etc/hosts', '/etc/paths', '/etc/donthavethisfile'];

var eachFunc = function (currentValue, index, array) {
	var done = this.async();
	fs.readFile(currentValue, {encoding:'utf-8'}, function (err,result) {
		if (err) {
			console.error('file: ' + currentValue + ' not found');
			done(false); //false to early abort;
		}
		else {
			console.log('file: ' + currentValue + ' load');
			console.log(result);
			done(true); //true to set async have done.
		};
	})
}

ForEach(arr, eachFunc, function () {
	console.log('foreach end');
})