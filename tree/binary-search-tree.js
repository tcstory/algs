function Node(key) {
    this.key = key;
    this.right = null;
    this.left = null;
}

function BinarySearchTree() {
    this._root = null;
}

BinarySearchTree.prototype.makeEmpty = function() {
    this._root = this._makeEmpty(this._root);
};

BinarySearchTree.prototype._makeEmpty = function(node) {
    if (node !== null) {
        node.left = this._makeEmpty(node.left);
        node.right = this._makeEmpty(node.right);
        return null;
    } else {
        return null;
    }
};

BinarySearchTree.prototype.find = function(key) {
    return this._find(this._root, key);
};

BinarySearchTree.prototype._find = function(node, key) {
    if (node === null) {
        return null;
    } else if (node.key === key) {
        return node;
    } else if (node.key > key) {
        return this._find(node.left, key);
    } else {
        return this._find(node.right, key);
    }
};

BinarySearchTree.prototype.findMin = function() {
    return this._findMin(this._root);
};

BinarySearchTree.prototype._findMin = function(node) {
    if (node !== null) {
        if (node.left !== null) {
            return this._findMin(node.left);
        } else {
            return node;
        }
    } else {
        return null;
    }
};

BinarySearchTree.prototype.findMax = function() {
    return this._findMax(this._root);
};

BinarySearchTree.prototype._findMax = function(node) {
    if (node !== null) {
        if (node.right !== null) {
            return this._findMax(node.right);
        } else {
            return node;
        }
    } else {
        return null;
    }
};

BinarySearchTree.prototype.insert = function(key) {
    return this._root = this._insert(this._root, key);
};

BinarySearchTree.prototype._insert = function(node, key) {
    if (node === null) {
        return new Node(key);
    } else if (node.key > key) {
        node.left = this._insert(node.left, key);
        return node;
    } else if (node.key < key) {
        node.right = this._insert(node.right, key);
        return node;
    } else {
        return node;
    }
};

BinarySearchTree.prototype.delete = function(key) {
    return this._root = this._delete(this._root, key);
};

BinarySearchTree.prototype._delete = function(node, key) {
    if (node === null) {
        return null;
    } else if (node.key > key) {
        node.left = this._delete(node.left, key);
        return node;
    } else if (node.key < key) {
        node.right = this._delete(node.right, key);
        return node;
    } else {
        if (node.left === null && node.right === null) {
            return null;
        } else if (node.left === null) {
            return node.right;
        } else if (node.right === null) {
            return node.left;
        } else {
            let minNode = this._findMin(node.right);
            node.key = minNode.key;
            node.right = this._delete(node.right, minNode.key);
            return node;
        }
    }
};

BinarySearchTree.prototype.preOrderTraversal = function(cb) {
    return this._preOrderTraversal(this._root, cb);
};

BinarySearchTree.prototype._preOrderTraversal = function(node, cb) {
    if (node === null) {
        cb(null);
    } else {
        cb(node);
        this._preOrderTraversal(node.left, cb);
        this._preOrderTraversal(node.right, cb);
    }
};

BinarySearchTree.prototype.inOrderTraversal = function(cb) {
    return this._inOrderTraversal(this._root, cb);
};

BinarySearchTree.prototype._inOrderTraversal = function(node, cb) {
    if (node === null) {
        cb(null);
    } else {
        this._inOrderTraversal(node.left, cb);
        cb(node);
        this._inOrderTraversal(node.right, cb);
    }
};

BinarySearchTree.prototype.postOrderTraversal = function(cb) {
    return this._postOrderTraversal(this._root, cb);
};

BinarySearchTree.prototype._postOrderTraversal = function(node, cb) {
    if (node === null) {
        cb(null);
    } else {
        this._postOrderTraversal(node.left, cb);
        this._postOrderTraversal(node.right, cb);
        cb(node);
    }
};

BinarySearchTree.prototype.breadthFirstTraversal = function(cb) {
    return this._breadthFirstTraversal(this._root, cb);
};

BinarySearchTree.prototype._breadthFirstTraversal = function(node, cb) {
    let queue = [];

    if (node === null) {
        return null;
    } else {
        queue = [node];
    }

    let traverse = function() {
        let t = queue.shift();
        cb(t);
        if (t.left !== null) {
            queue.push(t.left);
        }
        if (t.right !== null) {
            queue.push(t.right);
        }
        if (queue.length !== 0) {
            traverse();
        }

    };
    traverse();
};

BinarySearchTree.prototype.getHeightOfTree = function() {
    return this._getHeightOfNode(this._root);
};

BinarySearchTree.prototype.getHeightOfNode = function(node) {
    return this._getHeightOfNode(node);
};

BinarySearchTree.prototype._getHeightOfNode = function(node) {
    if (node === null) {
        return -1;
    } else {
        let i = this._getHeightOfNode(node.left);
        let j = this._getHeightOfNode(node.right);
        return Math.max(i, j) + 1;
    }
};

BinarySearchTree.prototype.getDepthOfNode = function(node) {
    return this._getDepthOfNode(this._root, node.key);
};

BinarySearchTree.prototype._getDepthOfNode = function(node, key) {
    if (node === null) {
        return -1;
    } else if (node.key === key) {
        return 0;
    } else {
        let i = this._getDepthOfNode(node.left, key);
        let j = this._getDepthOfNode(node.right, key);
        return Math.max(i, j) + 1;
    }
};


module.exports = BinarySearchTree;

if (require.main === module) {
    let tree = new BinarySearchTree();
    tree.insert(3);
    tree.insert(1);
    tree.insert(5);
    tree.insert(6);
    tree.insert(4);
    tree.insert(4);

    // tree.delete(5);

    let n;
    let results = [];
    tree.preOrderTraversal(function(node) {
        if (node !== null) {
            results.push(node.key);
            if (node.key === 3) {
                n = node;
            }
        }
    });

    console.log(results.join(','));
    console.log(tree.getDepthOfNode(n));
}
