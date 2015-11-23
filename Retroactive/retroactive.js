'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Queue = require('./lib/queue'),
    Stack = require('./lib/stack');

var Retroactive = (function () {
	function Retroactive(fully) {
		_classCallCheck(this, Retroactive);

		if (fully) {
			this.fully = true;
		} else {
			this.fully = false;
		}
	}

	_createClass(Retroactive, [{
		key: 'queue',
		get: function get() {
			return this.fully ? Queue.FullyQueue : Queue.PartialQueue;
		}
	}, {
		key: 'stack',
		get: function get() {
			return this.fully ? Stack.FullyStack : Stack.PartialStack;
		}
	}]);

	return Retroactive;
})();

module.exports = Retroactive;