'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var BST = require('./data_structures/bst');
var DoublyLinkedList = require('./data_structures/double_linked_list');

var Queue = (function () {
	function Queue() {
		_classCallCheck(this, Queue);
	}

	_createClass(Queue, [{
		key: 'push',
		value: function push(value) {
			return {
				op: 0,
				value: value
			};
		}
	}, {
		key: 'pop',
		value: function pop() {
			return {
				op: 1
			};
		}
	}]);

	return Queue;
})();

;

var PartialQueue = (function (_Queue) {
	_inherits(PartialQueue, _Queue);

	function PartialQueue() {
		_classCallCheck(this, PartialQueue);

		_get(Object.getPrototypeOf(PartialQueue.prototype), 'constructor', this).call(this);
		this.list = new DoublyLinkedList();
		this.front = 0; //pointer to the head
		this.back = 0; //pointer to the end
	}

	_createClass(PartialQueue, [{
		key: 'insert_push',
		value: function insert_push(value, time) {
			// console.log('insert push value:', value, 'time:', time);
			this.list.add({
				op: 0,
				value: value
			});
			this.front++;
		}
	}, {
		key: 'insert_pop',
		value: function insert_pop(time) {
			// console.log('insert pop time:', time);
			this.list.add({
				op: 1,
				value: null
			});
			this.front++;
			this.back++;
			//Don't actually pop the item in list
		}
	}, {
		key: 'insert',
		value: function insert(ops, time) {
			if (ops === null) {
				throw new Error('No support op');
			};
			if (time == this.maxTime) {
				return new Error('Time has been used');
			}

			switch (ops.op) {
				case 0:
					{
						//push
						this.insert_push(ops.value, time);
						break;
					}
				case 1:
					{
						//pop
						this.insert_pop(time);
						break;
					}
				default:
					{
						break;
					}
			}
		}
	}, {
		key: 'delete_push',
		value: function delete_push(time) {
			// console.log('delete push time:',time);
			var a = this.list.remove(time);
			this.front--;
		}
	}, {
		key: 'delete_pop',
		value: function delete_pop(time) {
			// console.log('delete pop time:',time);
			this.list.remove(time);
			this.front--;
			//remove will always decrease front pointer ,but not back pointer
			this.back--;
		}
	}, {
		key: 'delete',
		value: function _delete(time) {
			var item = this.list.item(time);
			var op = item != null ? item.op : null;
			switch (op) {
				case 0:
					{
						this.delete_push(time);
						break;
					}
				case 1:
					{
						this.delete_pop(time);
						break;
					}
				default:
					{
						break;
					}
			}
		}
	}, {
		key: 'query',
		value: function query() {
			var array = this.list.toArray(this.back, this.front);
			console.log(array);
			return array;
		}
	}]);

	return PartialQueue;
})(Queue);

;

var FullyQueue = (function (_Queue2) {
	_inherits(FullyQueue, _Queue2);

	function FullyQueue() {
		_classCallCheck(this, FullyQueue);

		_get(Object.getPrototypeOf(FullyQueue.prototype), 'constructor', this).call(this);
		this.bst = new BST(function (a, b) {
			if (a.time == b.time) return 0;
			return a.time < b.time ? -1 : 1;
		});
	}

	_createClass(FullyQueue, [{
		key: '_push',
		value: function _push(value, time) {
			console.log('push value:', value, 'time:', time);
			var pair = {
				time: time,
				op: 0,
				value: value
			};
			this.bst.insert(pair);
		}
	}, {
		key: '_pop',
		value: function _pop(time) {
			console.log('pop time:', time);
			var pair = {
				time: time,
				op: 1,
				value: null
			};
			this.bst.insert(pair);
		}
	}, {
		key: 'insert',
		value: function insert(ops, time) {
			if (ops === null) {
				throw new Error('No support op');
			};
			if (time == this.maxTime) {
				return new Error('Time has been used');
			}

			switch (ops.op) {
				case 0:
					{
						//push
						this._push(ops.value, time);
						break;
					}
				case 1:
					{
						//pop
						this._pop(time);
						break;
					}
				default:
					{
						throw new Error('No support op');
					}
			}
		}
	}, {
		key: 'delete',
		value: function _delete(time) {
			var pair = this.bst.contains({
				time: time
			});
			if (pair !== null) {
				console.log('delete:', pair);
			}
		}
	}, {
		key: 'query',
		value: function query(time) {}
	}, {
		key: 'maxTime',
		get: function get() {
			if (this.bst.root === null) {
				return -1;
			}
			return this.bst._findMax(this.bst.root);
		}
	}, {
		key: 'minTime',
		get: function get() {
			if (this.bst.root === null) {
				return -1;
			}
			return this.bst._findMin(this.bst.root);
		}
	}]);

	return FullyQueue;
})(Queue);

;

module.exports.Queue = Queue;
module.exports.PartialQueue = PartialQueue;
module.exports.FullyQueue = FullyQueue;