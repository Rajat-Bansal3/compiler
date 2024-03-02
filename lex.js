class Token {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}
class Lexer {
  constructor(input) {
    this.input = input;
    this.currPos = 0;
    this.tokens = [];
    
  }
  tokenize() {
    while (this.currPos < this.input.length) {
      let currChar = this.input[this.currPos];
      if (/\s/.test(currChar)) {
        this.currPos++;
        continue;
      }
      if (/[0-9]/.test(currChar)) {
        this.tokenizeNum();
        continue;
      }
      if (["+", "-", "*", "/", "(", ")"].includes(currChar)) {
        this.tokens.push(new Token(currChar, currChar));
        this.currPos++;
        continue;
      } else {
        throw new Error(`Invalid tokens or token scheme ${currChar}`);
      }
    }
    return this.tokens;
  }
  tokenizeNum() {
    let val = "";
    while (/[0-9]/.test(this.input[this.currPos])) {
      val += this.input[this.currPos++];
    }
    this.tokens.push(new Token("Number", parseInt(val)));
  }
}
let input = "3 +2";
let lex = new Lexer(input);
console.log(lex.tokenize());
