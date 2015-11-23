'use strict';

/**
 * Tree node
 */
function Node(value, left, right) {
  this.value = value;
  this.children = [left, right];
  this.size = 1;
  this.height = 1;
  this.key = Math.random();
}

/**
 * Computer the number of childnodes
 */
Node.prototype.resize = function () {
  this.size = (this.children[0] ? this.children[0].size : 0) 
            + (this.children[1] ? this.children[1].size : 0) + 1;
  this.height = Math.max(this.children[0] ? this.children[0].height : 0,
  						 this.children[1] ? this.children[1].height : 0) + 1;
  return this;
};

/**
 * Zigzag rotate of tree nodes
 */
Node.prototype.rotate = function (side) {
  var temp = this.children[side];

  // Rotate
  this.children[side] = temp.children[1 - side];
  temp.children[1 - side] = this;

  this.resize();
  temp.resize();

  return temp;
};

/**
 * Treap
 */
function Treap() {
  this.root = null;
}

/**
 * Insert new value into the subtree of `node`
 */
Treap.prototype._insert = function (node, value) {
  if (node === null) {
    return new Node(value, null, null);
  }

  // Passing to childnodes and update
  var side = ~~(value > node.value);
  node.children[side] = this._insert(node.children[side], value);

  // Keep it balance
  if (node.children[side].key < node.key) {
	return node.rotate(side);
  } else {
	return node.resize();
  }
};

Treap.prototype._find = function (node, value) {
  if (node === null) {
    // Empty tree
    return false;
  }
  if (node.value === value) {
    // Found!
    return true;
  }

  // Search within childnodes
  var side = ~~(value > node.value);
  return this._find(node.children[side], value);
};

Treap.prototype._minimum = function (node) {
  if (node === null) {
    // Empty tree, returns Infinity
    return Infinity;
  }

  return Math.min(node.value, this._minimum(node.children[0]));
};

Treap.prototype._maximum = function (node) {
  if (node === null) {
    // Empty tree, returns -Infinity
    return -Infinity;
  }

  return Math.max(node.value, this._maximum(node.children[1]));
};

Treap.prototype._remove = function (node, value) {
  if (node === null) {
    // Empty node, value not found
    return null;
  }

  var side;

  if (node.value === value) {
    if (node.children[0] === null && node.children[1] === null) {
      // It's a leaf, set to null
      return null;
    }

	// Rotate to a subtree and remove it
	side = (node.children[0] === null ? 1 : 0);
	node = node.rotate(side);
  	node.children[1 - side] = this._remove(node.children[1 - side], value);
  	return node.resize();
  } else {
    side = ~~(value > node.value);
    node.children[side] = this._remove(node.children[side], value);
  	return node.resize();
  }
};

Treap.prototype.insert = function (value) {
  this.root = this._insert(this.root, value);
};

Treap.prototype.find = function (value) {
  return this._find(this.root, value);
};

Treap.prototype.minimum = function () {
  return this._minimum(this.root);
};

Treap.prototype.maximum = function () {
  return this._maximum(this.root);
};

Treap.prototype.remove = function (value) {
  this.root = this._remove(this.root, value);
};

Treap.prototype.size = function () {
  return this.root ? this.root.size : 0;
};

Treap.prototype.height = function () {
  return this.root ? this.root.height : 0;
};

module.exports = Treap;
