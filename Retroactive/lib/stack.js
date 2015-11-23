'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var BST = require('./data_structures/bst');
var bst = new BST(function (a, b) {
	if (a.time === b.time) return 0;
	return a.time < b.time ? -1 : 1;
});

var Stack = (function () {
	function Stack() {
		_classCallCheck(this, Stack);
	}

	_createClass(Stack, [{
		key: '_pop',
		value: function _pop(time) {
			console.log('pop time :' + time);
			var pair = {
				time: time,
				op: 0,
				value: null
			};
			ast.insert(pair);
		}
	}, {
		key: '_push',
		value: function _push(value, time) {
			console.log('push value: ' + value + ' time: ' + time);
			var pair = {
				time: time,
				op: 0,
				value: value
			};
			ast.insert(pair);
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
		key: 'maxTime',
		get: function get() {
			if (bst.root === null) {
				return -1;
			}
			return bst._findMax(bst.root);
		}
	}, {
		key: 'minTime',
		get: function get() {
			if (bst.root === null) {
				return -1;
			}
			return bst._findMin(bst.root);
		}
	}], [{
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

	return Stack;
})();

;