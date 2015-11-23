var promisify = require('./promisify');
var fs = require('fs');


//Callback fs.readFile
fs.readFile('/etc/hosts', {encoding:'utf8',flag:'r'}, function (err, data) {
	if (err) throw err;
	console.log('callback:\n' + data);
});

//Promisify fs.readFile
var readFile = promisify(fs.readFile);
readFile('/etc/hosts', {encoding:'utf-8' ,flag:'r'}).then(function (contents) {
	console.log('promise:\n' + contents);
}).catch(function(error) {
	console.error(error);
});


//Type of callback(err, result)
function asyncA(callback) {
	if (1===1) callback(null, 'ok');
	else callback('wrong', null);
}

//Type of callback(result, err), call promisify(func, true) to use
function asyncB(callback) {
	if (1===1) callback('ok', null);
	else callback(null, 'wrong');
}

var a = promisify(asyncA);
a().then(function (result) {
	console.log('callback type A: ' + result);
}).catch(function (err) {
	console.error('callback type A: ' + err);
});

var b = promisify(asyncB, true);
b().then(function (result) {
	console.log('callback type B: ' + result);
}).catch(function (err) {
	console.error('callback type B: ' + err);
})