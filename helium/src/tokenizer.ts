import { exit } from "process";
import { Token, TokenType } from "./interfaces";

class Tokenizer {
  //utility functions
  private isAlpha(string: string) {
    return /^[a-zA-Z]+$/.test(string);
  }
  private isAlphaNumeric(string: string) {
    return /^[a-zA-Z0-9]+$/.test(string);
  }
  private isWhiteSpace(string: string) {
    return /\s/.test(string);
  }
  private isNumeric(string: string) {
    return /^[0-9]+$/.test(string);
  }
  private isSemi(string: string) {
    return string == ";";
  }

  private m_src: string;
  private m_index: number;
  private peek(ahead: number = 0): string {
    if (this.m_index + ahead >= this.m_src.length) {
      return "";
    } else {
      return this.m_src.charAt(this.m_index + ahead);
    }
  }
  private consume() {
    return this.m_src.charAt(this.m_index++);
  }

  constructor(src: string) {
    this.m_src = src;
    this.m_index = 0;
  }
  tokenize(): Token[] {
    let tokens: Token[] = [];
    let buf: string = "";

    while (this.peek()) {
      // (this.peek());
      if (this.isAlpha(this.peek())) {
        buf += this.consume();
        while (
          this.peek() !== null &&
          this.peek() !== undefined &&
          this.isAlphaNumeric(this.peek())
        ) {
          this.peek();
          buf += this.consume();
        }
        if (buf == "return") {
          tokens.push({ token: TokenType._return, value: buf });
          buf = "";
          continue;
        }
      } else if (this.isNumeric(this.peek())) {
        buf += this.consume();
        while (
          this.peek() !== null &&
          this.peek() !== undefined &&
          this.isNumeric(this.peek())
        ) {
          this.peek();
          buf += this.consume();
          continue;
        }
        tokens.push({ token: TokenType.int_lit, value: buf });
        buf = "";
        continue;
      } else if (this.isSemi(this.peek())) {
        buf = this.consume();
        tokens.push({ token: TokenType.semi, value: buf });
        buf = "";
        continue;
      } else if (this.isWhiteSpace(this.peek())) {
        this.consume();
        continue;
      } else {
        console.error(
          "wtf is that i donno that shii uk that u work with that i wont bish",
          this.peek()
        );
        exit(1);
      }
    }
    this.m_index = 0;
    return tokens;
  }
}

export default Tokenizer;
