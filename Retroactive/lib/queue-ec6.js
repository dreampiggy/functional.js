var BST = require('./data_structures/bst');
var DoublyLinkedList = require('./data_structures/double_linked_list');

class Queue {
	push(value) {
		return {
			op: 0,
			value: value
		}
	}

	pop() {
		return {
			op: 1
		}
	}
};

class PartialQueue extends Queue {
	constructor() {
		super();
		this.list = new DoublyLinkedList();
		this.front = 0; //pointer to the head
		this.back = 0; //pointer to the end
	}

	insert_push(value, time) {
		// console.log('insert push value:', value, 'time:', time);
		this.list.add({
			op: 0,
			value: value
		});
		this.front++;
	}

	insert_pop(time) {
		// console.log('insert pop time:', time);
		this.list.add({
			op: 1,
			value: null
		});
		this.front++;
		this.back++;
		//Don't actually pop the item in list
	}

	insert(ops, time) {
		if (ops === null) {throw new Error('No support op')};
		if (time == this.maxTime) {
			return new Error('Time has been used');
		}

		switch (ops.op) {
			case 0: {	//push
				this.insert_push(ops.value, time)
				break;
			}
			case 1: {	//pop
				this.insert_pop(time);
				break;
			}
			default: {
				break;
			}
		}
	}

	delete_push(time) {
		// console.log('delete push time:',time);
		var a = this.list.remove(time);
		this.front--;
	}

	delete_pop(time) {
		// console.log('delete pop time:',time);
		this.list.remove(time)
		this.front--;
		//remove will always decrease front pointer ,but not back pointer
		this.back--;
	}

	delete(time) {
		var item = this.list.item(time);
		var op = item != null ? item.op : null;
		switch (op) {
			case 0: {
				this.delete_push(time);
				break;
			}
			case 1: {
				this.delete_pop(time);
				break;
			}
			default: {
				break;
			}
		}

	}

	query() {
		var array = this.list.toArray(this.back, this.front);
		console.log(array);
		return array;
	}
};


class FullyQueue extends Queue {
	constructor() {
		super();
		this.bst = new BST((a,b) => {
  			if (a.time == b.time) return 0;
  			return a.time < b.time ? -1 : 1;
		});
	}

	get maxTime() {
		if (this.bst.root === null) {
			return -1;
		}
		return this.bst._findMax(this.bst.root);
	}

	get minTime() {
		if (this.bst.root === null) {
			return -1;
		}
		return this.bst._findMin(this.bst.root);
	}

	_push(value, time) {
		console.log('push value:', value, 'time:', time);
		var pair = {
			time: time,
			op: 0,
			value: value
		};
		this.bst.insert(pair);
	}

	_pop(time) {
		console.log('pop time:', time);
		var pair = {
			time: time,
			op: 1,
			value: null
		};
		this.bst.insert(pair);
	}

	insert(ops, time) {
		if (ops === null) {throw new Error('No support op')};
		if (time == this.maxTime) {
			return new Error('Time has been used');
		}

		switch (ops.op) {
			case 0: {	//push
				this._push(ops.value, time)
				break;
			}
			case 1: {	//pop
				this._pop(time);
				break;
			}
			default: {
				throw new Error('No support op');
			}
		}
	}

	delete(time) {
		var pair = this.bst.contains({
			time: time
		});
		if (pair !== null) {
			console.log('delete:', pair);
		}
	}

	query(time) {
	}
};

module.exports.Queue = Queue;
module.exports.PartialQueue = PartialQueue;
module.exports.FullyQueue = FullyQueue;