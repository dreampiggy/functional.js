function asyncFunction() {
	if (1 === 1){
		return Promise.resolve("OK");
	}
	else{
		return Promise.reject(new Error("Wrong"));
	}
}
/*
 *Equal to this version
 
function asyncFunction() {
	return new Promise(function(res,rej){
		if (1 === 1){
			res("OK");
		}
		else{
			rej(new Error("Wrong"));
		}
	});
}
*/
function anotherAsyncFunction(){
	if (2 != 2){
		return Promise.resolve("OK");
	}
	else{
		return Promise.reject(new Error("Wrong"));
	}
}

//Use a Promise array.call then() when all Promise is resolve->then() or reject->catch()
Promise.all([asyncFunction(),anotherAsyncFunction()]).then(function(val){
	console.log("All:" + val);
}).catch(function(err){
	console.error("All:" + err);
})

//Use a Promise array.call then() when any Promise is resolve->then() or reject->catch()
Promise.race([asyncFunction(),anotherAsyncFunction()]).then(function(val){
	console.log("Race:" + val);
}).catch(function(err){
	console.error("Race:" + err);
});

console.log("This call first.Promise is async");