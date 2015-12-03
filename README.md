# Functional.js

[![npm](https://img.shields.io/npm/v/functionaljs.svg)](https://www.npmjs.com/package/functionaljs)
[![travis](https://img.shields.io/travis/lizhuoli1126/functional.js.svg)](https://travis-ci.org/lizhuoli1126/functional.js)
[![License](https://img.shields.io/dub/l/vibe-d.svg)](https://opensource.org/licenses/MIT)
[![Star](https://img.shields.io/github/stars/lizhuoli1126/functional.js.svg?style=social&label=Star)](https://github.com/lizhuoli1126/functional.js)

> Functional syntax sugar and more, for JavaScript

![logo](https://cloud.githubusercontent.com/assets/6919743/11389589/21b1bd72-937d-11e5-84ae-657dddf74aa6.png)

## Why Functional?

**1 .Spead up your develop!**

**2. Build a high-level logic!**

**3. For fun, isn't it?**


## Install
> Of course. Install by [npm](https://www.npmjs.com/package/functionaljs) with one line

```bash
npm install functionaljs
```

## Build

Because [ECMAScript 6 Standard](http://www.ecma-international.org/ecma-262/6.0/) has released, so we all use this to build. But not all runtime support the standard.

So, if you use Node.js `v5.0.0` or higher, you can use pure `*-ec6.js` to run. Otherwise use the compiled js(`without -ec6`) by [Babel](https://babeljs.io/repl/)

You can install `Babel` through `npm` and use `node-babel` instead of `node` to run example.

```bash
sudo npm install -g babel-cli
```

We recommend to use [Sublime Text](http://www.sublimetext.com/3) with [Babel](https://packagecontrol.io/packages/Babel) plugin. (Which support EC6 and JSX syntax better) and here is a build-system for Sublime in `Other/Babel.sublime-build`. One short-key `Command + Shift + B` to run.


## Async

> What is async [Wikipedia](hhttps://en.wikipedia.org/wiki/Asynchronous_I/O) [About future and promise](https://en.wikipedia.org/wiki/Futures_and_promises) 

+ Async foreach call

```javascript
var ForEach = require('functionaljs').ForEach;
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
```

## Promise

> What is promise? [Standard](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) [中文说明](http://liubin.github.io/promises-book/)

+ Promise

> Just use Node.js built-in Promise(from `0.12`), or use [Promise](https://www.npmjs.com/package/promise) for **ancient** version Node.js

+ Promisify

> Convert callback function to promise object

```javascript
var promisify = require('functionaljs').Promisify;
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
var Monad = require('functionaljs').Monad;
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
var Optional = require('functionaljs').Optional;
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
> 
> Attention. Use `Function.curry` call may be conflict with your custom function `curry` prototype(if you do so). Please set it to `undefined` if you don't want

```javascript
var curry = require('functionaljs').Curry;
//Use by invoking
var multiply = function (a, b) {
	return a * b;
}
var double = curry(multiply, function (args) {
	args.push(2);	//which means multiply(2, x)
	return args;
});

//Use by function prototype
var square = multiply.curry(function (args) {
	args.push(args[0]);	//which means multiply(x, x)
	return args;
})
console.log(multiply(3, 4));//12
console.log(double(3));//6
console.log(square(4));//16
```

## Combinator

> What is Y-combinator? [Wikipedia](https://en.wikipedia.org/wiki/Fixed-point_combinator#Fixed_point_combinators_in_lambda_calculus) [知乎来源](http://www.zhihu.com/question/21099081#answer-2707220)
> 
> Attention: for strict languages(which means function call by value) such as `JavaScript`, using original `Y-combinator` will cause stack overflow because calling `f(x(x))` means the compiler(interpreter) will try to generate `accuracy` defination with infinity stack alloc. So we use `Z-combinator` to actually implement `Y-combinator`. For more, see: [Z-combinator](https://en.wikipedia.org/wiki/Fixed-point_combinator#Strict_fixed_point_combinator)

+ Y-combinator

```javascript
/*
We can build a `pure` lambda(anonymous function) with Y-combinator.
See `y-test.js` and learn from step by step what `Y-combinator` is
*/

var Y = require('functionaljs').Y;
var fibonacci = Y(function(f) {
	return function(n) {
		return n == 0 ? 1 : n * f(n - 1);
	}
})
console.log(fibonacci(5))
```

## Lazy

> What is lazy? [Wikipedia](https://en.wikipedia.org/wiki/Lazy_evaluation) [中文说明](http://segmentfault.com/a/1190000000358463)
> 
> Thanks to [@pkrumins](https://github.com/pkrumins)

```javascript
var Lazy = require('functionaljs').Lazy;

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
//0 4 8 12 16
```

## Retroactive(Data Structure)

> What is retroactive? [Wikipedia](https://en.wikipedia.org/wiki/Retroactive_data_structures) [Paper](http://delivery.acm.org/10.1145/1250000/1240236/a13-demaine.pdf?ip=223.3.93.86&id=1240236&acc=ACTIVE%20SERVICE&key=BF85BBA5741FDC6E%2EEEBE655830483280%2E4D4702B0C3E38B35%2E4D4702B0C3E38B35&CFID=558486549&CFTOKEN=73726269&__acm__=1446648373_12ed7d4fa794b6c9a384f96437e3588f) [Reference](http://python-retroactive-data-structures.readthedocs.org/en/latest/specifics/)
> 
> At now just implement `retoractive queue`

```javascript
var retroactive = require('functionaljs').Retroactive;

//partial construct with false or null, fully with true

var partial = new retroactive(false);
var fully = new retroactive(true);

//next use property to generate new object

var partialQueue = new partial.queue();

function partialQueueTest(queue) {
	queue.insert(queue.push(1), 0);
	queue.insert(queue.push(2), 1);
	queue.query();	//[1,2]
	queue.insert(queue.pop(), 2);
	queue.query();	//[2]
	queue.delete(2);
	queue.query();	//[1,2]
	queue.delete(0);
	queue.query();	//[2]
}
```

## License MIT