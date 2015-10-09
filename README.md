# Functional-OO

> Currently are all use JavaScript to explain

## Why Functional?

**1 .Spead up your develop!**

**2. Build a high-level logic!**

**3. For fun, isn't it?**

## Async

> What is async [Wikipedia](hhttps://en.wikipedia.org/wiki/Asynchronous_I/O) [About future and promise](https://en.wikipedia.org/wiki/Futures_and_promises) 

+ Async foreach call

```javascript
var ForEach = require('./foreach');
var fs = require('fs');
var arr = [1, 2, 3];
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
```

## Promise

> What is promise? [Standard](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) [中文说明](http://liubin.github.io/promises-book/)

+ Promise

> Just use Node.js built-in Promise(from `0.12`), or use [Promise](https://www.npmjs.com/package/promise) for **ancient** version Node.js

+ Promisify

> Convert callback function to promise object

```javascript
var promisify = require('./promisify');
var fs = require('fs');
var readFile = promisify(fs.readFile);
readFile('/etc/hosts', {encoding:'utf-8' ,flag:'r'}).then(function (contents) {
	console.log('promise:\n' + contents);
}).catch(function(error) {
	console.error(error);
});
```

## Monad

> What is monad? [Wikipedia](https://en.wikipedia.org/wiki/Monad) [中文说明](http://www.ruanyifeng.com/blog/2015/07/monad.html)

```javascript
var Monad = require('./monad');
//Use
var monad = new Monad;
var monad = new Monad(10);

monad.unit(20);
monad.unit(new Monad(30));

monad.bind(function (value) { return value });
var result = monad.bind(function (value) {
	return value.extract() * 2;
})

console.log(result.extract());//60
```

## Optional

> What is optional? [Wikipedia](https://en.wikipedia.org/wiki/Option_type) [Optional in Swift](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/doc/uid/TP40014097-CH31-ID452)

```javascript
var Optional = require('./optional');
//Use
var op = new Optional(1);

op.present(function (value) {
	console.log(value);//1
});

var result = op.map(function (value) {
	return ++value;
}).map(function (value) {
	return value *= 2;
}).filter(function (value) {
	return value === 4 ? true : false;
}).flatMap(function (value) {
	return new Optional(value);
});

if (result.empty()) {
	result.or(0);
}
console.log(result.get());//4
```

## Curry

> What is curry? [Wikipedia](https://en.wikipedia.org/wiki/Currying) [中文说明](https://gist.github.com/jcouyang/b56a830cd55bd230049f)

```javascript
//Use
var multiply = function (a, b) {
	return a * b;
}
var double = multiply.curry(function (args) {
	args.push(2);
	return args;
});
var square = multiply.curry(function (args) {
	args.push(args[0]);
	return args;
})
console.log(multiply(3, 4));//12
console.log(double(3));//6
console.log(square(4));//16
```

## Lazy(Unfinished)

> What is lazy? [Wikipedia](https://en.wikipedia.org/wiki/Lazy_evaluation) [中文说明](http://segmentfault.com/a/1190000000358463)

```javascript
var stream = next(0);
console.log(stream);//[]
console.log(head(tail(tail(stream))));//2
```