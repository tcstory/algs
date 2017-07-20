const readline = require('readline');

function Node(val = null) {
    this.val = val;
    this.left = null;
    this.right = null;
}

function ExpressionTree(val) {
    this._root = new Node(val);
}

ExpressionTree.prototype.getRoot = function () {
    return this._root;
};

ExpressionTree.prototype.merge = function (leftTree, rightTree) {
    this._root.left = leftTree.getRoot();
    this._root.right = rightTree.getRoot();
};

ExpressionTree.prototype.preOrder = function () {
    let result = [];
    let traverse = function (node) {
        if (node === null) {
            return;
        }

        result.push(node.val);
        traverse(node.left);
        traverse(node.right);
    };
    traverse(this.getRoot());
    return result;
};

ExpressionTree.prototype.inOrder = function () {
    let result = [];
    let traverse = function (node) {
        if (node === null) {
            return;
        }
        traverse(node.left);
        result.push(node.val);
        traverse(node.right);
    };
    traverse(this._root);
    return result;
};

ExpressionTree.prototype.postOrder = function () {
    let result = [];
    let traverse = function (node) {
        if (node === null) {
            return;
        }
        traverse(node.left);
        traverse(node.right);
        result.push(node.val);
    };
    traverse(this._root);
    return result;
};

function convertToPostfix(expression) {
    let operandStack = [];
    let result = [];

    let prec = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '(': 1,
    };

    for (let item of expression) {
        if (/[0-9]/.test(item)) {
            result.push(item);
        } else if (item === '(') {
            operandStack.push(item);
        } else if (/[+\-*/]/.test(item)) {
            while (operandStack.length !== 0) {
                let top = operandStack[operandStack.length - 1];
                if (prec[item] < prec[top]) {
                    result.push(operandStack.pop());
                } else {
                    break;
                }
            }
            operandStack.push(item);
        } else {
            let operand = operandStack.pop();
            while (operand !== '(') {
                result.push(operand);
                operand = operandStack.pop();
            }
        }
    }

    while (operandStack.length !== 0) {
        result.push(operandStack.pop());
    }

    return result;
}

function buildExpressionTree(expression) {
    let stack = [];

    for (let item of expression) {
        if (/[0-9]/.test(item)) {
            stack.push(new ExpressionTree(item));
        } else {
            let rightTree = stack.pop();
            let leftTree = stack.pop();
            let tree = new ExpressionTree(item);
            tree.merge(leftTree, rightTree);
            stack.push(tree);
        }
    }

    return stack.pop();
}

let main = async function () {
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let expression = await new Promise(function (resolve, reject) {
        rl.question('请输入一个中缀表达式\n$ ', (answer) => {
            rl.close();
            resolve(answer);
        });
    });

    let result = convertToPostfix(expression.split(''));
    console.log(result.join(''));

    let tree = buildExpressionTree(result);
    console.log(tree.preOrder());
    console.log(tree.inOrder());
    console.log(tree.postOrder());
};

main();