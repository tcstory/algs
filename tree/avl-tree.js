const BinarySearchTree = require('./binary-search-tree');

function inherits(child, parent) {
    child.prototype = Object.create(parent.prototype, {
        constructor: {
            value: child,
            enumerable: false,
            writable: true,
            configurable: true,
        }
    });
}

function Node(key) {
    this.key = key;
    this.right = null;
    this.left = null;
}

function AVLTree() {
    BinarySearchTree.call(this);
}

inherits(AVLTree, BinarySearchTree);

AVLTree.prototype.leftRotate = function (x) {
    let y = x.right;
    x.right = y.left;
    y.left = x;
    return y;
};

AVLTree.prototype.rightRotate = function (x) {
    let y = x.left;
    x.left = y.right;
    y.right = x;
    return y;
};

AVLTree.prototype._insert = function (node, key) {
    if (node === null) {
        node = new Node(key);
    } else if (node.key > key) {
        node.left = this._insert(node.left, key);
    } else if (node.key < key) {
        node.right = this._insert(node.right, key);
    } else {
        return node;
    }

    let factor = this.getBalance(node);
    if (factor > 1) {
        if (key < node.left.key) {
            return this.rightRotate(node);
        } else {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }
    }

    if (factor < -1) {
        if (key > node.right.key) {
            return this.leftRotate(node);
        } else {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }
    }

    return node;
};

AVLTree.prototype.delete = function (key) {
    return this._root = this._delete(this._root, key);
};

AVLTree.prototype._delete = function (node, key) {
    if (node === null) {
        return null;
    } else if (node.key > key) {
        node.left = this._delete(node.left, key);
    } else if (node.key < key) {
        node.right = this._delete(node.right, key);
    } else {
        if (node.left === null && node.right === null) {
            node = null;
        } else if (node.left === null) {
            node = node.right;
        } else if (node.right === null) {
            node = node.left;
        } else {
            let minNode = this._findMin(node.right);
            node.key = minNode.key;
            node.right = this._delete(node.right, minNode.key);
        }
    }

    let factor = this.getBalance(node);

    if (factor > 1) {
        if (this.getBalance(node.left) >= 0) {
            return this.rightRotate(node);
        } else {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }
    }

    if (factor < -1) {
        if (this.getBalance(node.right) >= 0) {
            return this.leftRotate(node);
        } else {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }
    }

    return node;
};

AVLTree.prototype.getBalance = function (node) {
    return this.getHeightOfNode(node.left) - this.getHeightOfNode(node.right);
};

if (require.main === module) {
    let tree = new AVLTree();
    tree.insert(9);
    tree.insert(5);
    tree.insert(10);
    tree.insert(0);
    tree.insert(6);
    tree.insert(11);
    tree.insert(-1);
    tree.insert(1);
    tree.insert(2);

    let results = [];
    tree.preOrderTraversal(function (item) {
        if (item !== null) {
            results.push(item.key);
        }
    });
    console.log(results.join(','));

    tree.delete(10);

    results = [];
    tree.preOrderTraversal(function (item) {
        if (item !== null) {
            results.push(item.key);
        }
    });
    console.log(results.join(','));

}
