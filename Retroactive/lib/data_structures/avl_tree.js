'use strict';

/**
 * AVL Tree
 */
function AVLTree() {
  this.root = null;
}

/**
 * Tree node
 */
function Node(value, left, right, parent, height) {
  this.value = value;
  this.left = left;
  this.right = right;
  this.parent = parent;
  this.height = height;
}

/**
 * Calculates the height of a node based on height
 * property of all his children.
 */
AVLTree.prototype.getNodeHeight = function (node) {
  var height = 1;
  if (node.left !== null && node.right !== null) {
    height = Math.max(node.left.height, node.right.height) + 1;
  } else if (node.left !== null) {
    height = node.left.height + 1;
  } else if (node.right !== null) {
    height = node.right.height + 1;
  }
  return height;
};

/**
 * Verifies if the given node is balanced.
 */
AVLTree.prototype.isNodeBalanced = function (node) {
  var isBalanced = true;

  if (node.left !== null && node.right !== null) {
    isBalanced = (Math.abs(node.left.height - node.right.height) <= 1);
  } else if (node.right !== null && node.left === null) {
    isBalanced = node.right.height < 2;
  } else if (node.left !== null && node.right === null) {
    isBalanced = node.left.height < 2;
  }
  return isBalanced;
};

/**
 * When a removal happens, some nodes need to be
 * restructured. Gets and return these nodes.
 */
AVLTree.prototype.getNodesToRestructureAfterRemove = function (traveledNodes) {
  // z is last traveled node - imbalance found at z
  var zIndex = traveledNodes.length - 1;
  var z = traveledNodes[zIndex];

  // y should be child of z with larger height
  // (cannot be ancestor of removed node)
  var y;
  if (z.left !== null && z.right !== null) {
    y = (z.left === y) ? z.right : z.left;
  } else if (z.left !== null && z.right === null) {
    y = z.left;
  } else if (z.right !== null && z.left === null) {
    y = z.right;
  }

  // x should be tallest child of y
  // If children same height, x should be child of y
  // that has same orientation as z to y
  var x;
  if (y.left !== null && y.right !== null) {
    if (y.left.height > y.right.height) {
      x = y.left;
    } else if (y.left.height < y.right.height) {
      x = y.right;
    } else if (y.left.height === y.right.height) {
      x = (z.left === y) ? y.left : y.right;
    }
  } else if (y.left !== null && y.right === null) {
    x = y.left;
  } else if (y.right !== null && y.left === null) {
    x = y.right;
  }
  return [x, y, z];
};

/**
 * When a insertion happens, some nodes need to be
 * restructured. Gets and return these nodes.
 */
AVLTree.prototype.getNodesToRestructureAfterInsert = function (traveledNodes) {
  // z is last traveled node - imbalance found at z
  var zIndex = traveledNodes.length - 1;
  var z = traveledNodes[zIndex];

  // y should be child of z with larger height
  // (must be ancestor of inserted node)
  // therefore, last traveled node is correct.
  var yIndex = traveledNodes.length - 2;
  var y = traveledNodes[yIndex];

  // x should be tallest child of y
  // If children same height, x should be ancestor
  // of inserted node (in traveled path)
  var x;
  if (y.left !== null && y.right !== null) {
    if (y.left.height > y.right.height) {
      x = y.left;
    } else if (y.left.height < y.right.height) {
      x = y.right;
    } else if (y.left.height === y.right.height) {
      var xIndex = traveledNodes.length - 3;
      x = traveledNodes[xIndex];
    }
  } else if (y.left !== null && y.right === null) {
    x = y.left;
  } else if (y.right !== null && y.left === null) {
    x = y.right;
  }
  return [x, y, z];
};

/**
 * Keep the height balance property by walking to
 * root and checking for invalid heights.
 */
AVLTree.prototype.keepHeightBalance = function (node, afterRemove) {
  var current = node;
  var traveledNodes = [];
  while (current !== null) {
    traveledNodes.push(current);
    current.height = this.getNodeHeight(current);
    if (!this.isNodeBalanced(current)) {
      var nodesToBeRestructured = (afterRemove) ?
        this.getNodesToRestructureAfterRemove(traveledNodes) :
        this.getNodesToRestructureAfterInsert(traveledNodes);
      this.restructure(nodesToBeRestructured);
    }
    current = current.parent;
  }
};

/**
 * Identifies and calls the appropriate pattern
 * rotator.
 */
AVLTree.prototype.restructure = function (nodesToRestructure) {
  var x = nodesToRestructure[0];
  var y = nodesToRestructure[1];
  var z = nodesToRestructure[2];

  // Determine Rotation Pattern
  if (z.right === y && y.right === x) {
    this.rightRight(x, y, z);
  } else if (z.left === y && y.left === x) {
    this.leftLeft(x, y, z);
  } else if (z.right === y && y.left === x) {
    this.rightLeft(x, y, z);
  } else if (z.left === y && y.right === x) {
    this.leftRight(x, y, z);
  }
};

/**
 * Right-right rotation pattern.
 */
AVLTree.prototype.rightRight = function (x, y, z) {
  // pass z parent to y and move y's left to z's right
  if (z.parent !== null) {
    var orientation = (z.parent.left === z) ? 'left' : 'right';
    z.parent[orientation] = y;
    y.parent = z.parent;
  } else {
    this.root = y;
    y.parent = null;
  }

  // z adopts y's left.
  z.right = y.left;
  if (z.right !== null) {
    z.right.parent = z;
  }
  // y adopts z
  y.left = z;
  z.parent = y;

  // Correct each nodes height - order matters, children first
  x.height = this.getNodeHeight(x);
  z.height = this.getNodeHeight(z);
  y.height = this.getNodeHeight(y);
};

/**
 * Left-left rotation pattern.
 */
AVLTree.prototype.leftLeft = function (x, y, z) {
  //pass z parent to y and move y's right to z's left
  if (z.parent !== null) {
    var orientation = (z.parent.left === z) ? 'left' : 'right';
    z.parent[orientation] = y;
    y.parent = z.parent;
  } else {
    this.root = y;
    y.parent = null;
  }

  z.left = y.right;
  if (z.left !== null) {
    z.left.parent = z;
  }
  //fix y right child
  y.right = z;
  z.parent = y;

  // Correct each nodes height - order matters, children first
  x.height = this.getNodeHeight(x);
  z.height = this.getNodeHeight(z);
  y.height = this.getNodeHeight(y);
};

/**
 * Right-left rotation pattern.
 */
AVLTree.prototype.rightLeft = function (x, y, z) {
  //pass z parent to x
  if (z.parent !== null) {
    var orientation = (z.parent.left === z) ? 'left' : 'right';
    z.parent[orientation] = x;
    x.parent = z.parent;
  } else {
    this.root = x;
    x.parent = null;
  }

  // Adoptions
  z.right = x.left;
  if (z.right !== null) {
    z.right.parent = z;
  }
  y.left = x.right;
  if (y.left !== null) {
    y.left.parent = y;
  }

  // Point to new children (x new parent)
  x.left = z;
  x.right = y;
  x.left.parent = x;
  x.right.parent = x;

  // Correct each nodes height - order matters, children first
  y.height = this.getNodeHeight(y);
  z.height = this.getNodeHeight(z);
  x.height = this.getNodeHeight(x);
};

/**
 * Left-right rotation pattern.
 */
AVLTree.prototype.leftRight = function (x, y, z) {
  //pass z parent to x
  if (z.parent !== null) {
    var orientation = (z.parent.left === z) ? 'left' : 'right';
    z.parent[orientation] = x;
    x.parent = z.parent;
  } else {
    this.root = x;
    x.parent = null;
  }

  // Adoptions
  z.left = x.right;
  if (z.left !== null) {
    z.left.parent = z;
  }
  y.right = x.left;
  if (y.right !== null) {
    y.right.parent = y;
  }

  // Point to new children (x new parent)
  x.right = z;
  x.left = y;
  x.left.parent = x;
  x.right.parent = x;

  // Correct each nodes height - order matters, children first
  y.height = this.getNodeHeight(y);
  z.height = this.getNodeHeight(z);
  x.height = this.getNodeHeight(x);
};

/**
 * Inserts a value as a Node of an AVL Tree.
 */
AVLTree.prototype.insert = function (value, current) {
  if (this.root === null) {
    this.root = new Node(value, null, null, null, 1);
    this.keepHeightBalance(this.root);
    return;
  }

  var insertKey;
  current = current || this.root;
  if (current.value > value) {
    insertKey = 'left';
  } else {
    insertKey = 'right';
  }

  if (!current[insertKey]) {
    current[insertKey] = new Node(value, null, null, current);
    this.keepHeightBalance(current[insertKey], false);
  } else {
    this.insert(value, current[insertKey]);
  }
};

/**
 * In-order traversal from the given node.
 */
AVLTree.prototype.inOrder = function (current, callback) {
  if (!current) {
    return;
  }
  this.inOrder(current.left, callback);
  if (typeof callback === 'function') {
    callback(current);
  }
  this.inOrder(current.right, callback);
};

/**
 * Post-order traversal from the given node.
 */
AVLTree.prototype.postOrder = function (current, callback) {
  if (!current) {
    return;
  }

  this.postOrder(current.left, callback);
  this.postOrder(current.right, callback);
  if (typeof callback === 'function') {
    callback(current);
  }
};

/**
 * Pre-order traversal from the given node.
 */
AVLTree.prototype.preOrder = function (current, callback) {
  if (!current) {
    return;
  }
  if (typeof callback === 'function') {
    callback(current);
  }
  this.preOrder(current.left, callback);
  this.preOrder(current.right, callback);
};

/**
 * Finds a node by its value.
 */
AVLTree.prototype.find = function (value) {
  return this._find(value, this.root);
};

/**
 * Finds a node by its value in the given sub-tree.
 */
AVLTree.prototype._find = function (value, current) {
  if (!current) {
    return null;
  }

  var node;
  if (current.value === value) {
    node = current;
  } else if (current.value > value) {
    node = this._find(value, current.left);
  } else if (current.value < value) {
    node = this._find(value, current.right);
  }

  return node;
};

/**
 * Replaces the given child with the new one,
 * for the given parent.
 */
AVLTree.prototype.replaceChild = function (parent, oldChild, newChild) {
  if (parent === null) {
    this.root = newChild;
    if (this.root !== null) {
      this.root.parent = null;
    }
  } else {
    if (parent.left === oldChild) {
      parent.left = newChild;
    } else {
      parent.right = newChild;
    }
    if (newChild) {
      newChild.parent = parent;
    }
  }
};

/**
 * Removes a node by its value.
 */
AVLTree.prototype.remove = function (value) {
  var node = this.find(value);
  if (!node) {
    return false;
  }

  if (node.left && node.right) {
    var min = this.findMin(node.right);
    var temp = node.value;
    node.value = min.value;
    min.value = temp;
    return this.remove(min);
  } else if (node.left) {
    this.replaceChild(node.parent, node, node.left);
    this.keepHeightBalance(node.left, true);
  } else if (node.right) {
    this.replaceChild(node.parent, node, node.right);
    this.keepHeightBalance(node.right, true);
  } else {
    this.replaceChild(node.parent, node, null);
    this.keepHeightBalance(node.parent, true);
  }
  return true;
};

/**
 * Finds the node with minimum value in the given
 * sub-tree.
 */
AVLTree.prototype._findMin = function (node, current) {
  current = current || {
    value: Infinity
  };
  if (!node) {
    return current;
  }
  if (current.value > node.value) {
    current = node;
  }
  return this._findMin(node.left, current);
};

/**
 * Finds the node with maximum value in the given
 * sub-tree.
 */
AVLTree.prototype._findMax = function (node, current) {
  current = current || {
    value: -Infinity
  };
  if (!node) {
    return current;
  }
  if (current.value < node.value) {
    current = node;
  }
  return this._findMax(node.right, current);
};

/**
 * Finds the node with minimum value in the whole tree.
 */
AVLTree.prototype.findMin = function () {
  return this._findMin(this.root);
};

/**
 * Finds the node with maximum value in the whole tree.
 */
AVLTree.prototype.findMax = function () {
  return this._findMax(this.root);
};

/**
 * Verifies if the tree is balanced.
 */
AVLTree.prototype.isTreeBalanced = function () {
  var current = this.root;

  if (!current) {
    return true;
  }
  return this._isBalanced(current._left) &&
    this._isBalanced(current._right) &&
    Math.abs(this._getNodeHeight(current._left) -
      this._getNodeHeight(current._right)) <= 1;
};

/**
 * Calculates the height of the tree based on height
 * property.
 */
AVLTree.prototype.getTreeHeight = function () {
  var current = this.root;

  if (!current) {
    return 0;
  }
  return 1 + Math.max(this.getNodeHeight(current._left),
    this._getNodeHeight(current._right));
};

module.exports = AVLTree;
