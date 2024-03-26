class Evaluator {
  evaluate(ast) {
    if (ast.type === 'Number') {
      return ast.value;
    } else if (ast.type === '+') {
      return this.evaluate(ast.left) + this.evaluate(ast.right);
    } else if (ast.type === '-') {
      return this.evaluate(ast.left) - this.evaluate(ast.right);
    } else if (ast.type === '*') {
      return this.evaluate(ast.left) * this.evaluate(ast.right);
    } else if (ast.type === '/') {
      const rightValue = this.evaluate(ast.right);
      if (rightValue === 0) {
        throw new Error("Division by zero");
      }
      return this.evaluate(ast.left) / rightValue;
    } else {
      throw new Error(`Unsupported operation: ${ast.type}`);
    }
  }
}

module.exports = {
  Evaluator,
};
