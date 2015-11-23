var retroactive = require('./retroactive');

//partial construct with false or null, fully with true

var partial = new retroactive(false);
var fully = new retroactive(true);

//next use property to generate new object

var partialQueue = new partial.queue();
// var fullyQueue = new fully.queue();
// var partialStack = new partial.stack();
// var fullyStack = new fully.stack();


/* Partial DS
 * insert(ops, time)
 * delete(ops)
 * query(ops)
 */

/* Fully DS
 * insert(ops, time)
 * delete(ops)
 * query(ops, time)
 */

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

	queue.insert(queue.push(3),2);
	queue.insert(queue.push(4),3);

	queue.query();	//[2,3,4];
}

partialQueueTest(partialQueue);



