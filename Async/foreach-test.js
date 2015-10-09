var ForEach = require('./foreach');
var fs = require('fs');
var arr = [1, 11, 9];
var eachFunc = function (currentValue, index, array) {
	var done = this.async();
	fs.readFile('/etc/hosts', {encoding:'utf-8'}, function (err,result) {
		if (result) {
			console.log(currentValue,index,array);
			done(true); //true to set async have done. false to early abort;
		}
	})
}

ForEach(arr, eachFunc, function () {
	console.log('all ok');
})