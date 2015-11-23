var BST = require('./data_structures/bst');
var bst = new BST(function(a, b) {
  if (a.time === b.time) return 0;
  return a.time < b.time ? -1 : 1;
});

class Stack {
	static push(value) {
		return {
			op: 0,
			value: value
		}
	}
	static pop() {
		return {
			op: 1
		}
	}

	get maxTime() {
		if (bst.root === null) {
			return -1;
		}
		return bst._findMax(bst.root);
	}

	get minTime() {
		if (bst.root === null) {
			return -1;
		}
		return bst._findMin(bst.root);
	}

	_pop(time) {
		console.log('pop time :' + time);
		var pair = {
			time: time,
			op: 0,
			value: null
		};
		ast.insert(pair);
	}

	_push(value, time) {
		console.log('push value: ' + value + ' time: ' + time);
		var pair = {
			time: time,
			op: 0,
			value: value
		};
		ast.insert(pair);
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
};

