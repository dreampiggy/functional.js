'use strict';
var Queue = require('./lib/queue'),
	Stack = require('./lib/stack');

class Retroactive {
	constructor(fully) {
		if (fully) {
			this.fully = true;
		} else {
			this.fully = false;
		}
	}

	get queue() {
		return this.fully ? Queue.FullyQueue : Queue.PartialQueue;
	}

	get stack() {
		return this.fully ? Stack.FullyStack : Stack.PartialStack;
	}
}

module.exports = Retroactive;