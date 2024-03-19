class Parser {
  constructor(token) {
    this.token = token;
    this.current = 0;
  }
  parse() {
    return this.parseExpression();
  }
  parseExpression() {
    let left = this.parseFactor();
    while (this.match(["+", "-"])) {
      let op = this.advance();
      let right = this.parseFactor();
      left = { type: op.type, left, right };
    }
    return left;
  }
  parseFactor() {
    let left = this.parseTerm();
    while (this.match(["*", "/"])) {
      let op = this.advance();
      let right = this.parseTerm();
      if (op.type === "/" && right === 0) {
        throw new Error("division by zero");
      }
      left = { type: op.type, left, right };
    }
    return left;
  }
  parseTerm() {
    if (this.match("Number")) {
      return { type: "Number", value: this.advance().value };
    } else if (this.match("(")) {
      this.advance();
      let exp = this.parseExpression();
      this.consume(")", "')' is expected after the expression");
      return exp;
    } else {
      throw new Error(`Invalid token ${this.peek().type}`);
    }
  }
  consume(type, msg) {
    if (this.match(type)) {
      return this.advance();
    } else {
      throw new Error(`${msg} found : ${this.peek().type}`);
    }
  }
  match(types) {
    return types.includes(this.token[this.current].type);
  }
  //for iteration over tokens
  advance() {
    if (!this.end()) {
      this.current++;
      return this.previous();
    } else {
      throw new Error("Tokens ended cant proceed");
    }
  }
  //util functions
  end() {
    return this.peek() === "EOF";
  }
  peek() {
    return this.token[this.current];
  }
  previous() {
    return this.token[this.current - 1];
  }
}

module.exports = {
  Parser,
};
