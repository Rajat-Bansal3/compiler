"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
var TokenType;
(function (TokenType) {
    TokenType[TokenType["_return"] = 0] = "_return";
    TokenType[TokenType["int_lit"] = 1] = "int_lit";
    TokenType[TokenType["semi"] = 2] = "semi";
})(TokenType || (TokenType = {}));
class Tokenizer {
    //utility functions
    isAlpha(string) {
        return /^[a-zA-Z]+$/.test(string);
    }
    isAlphaNumeric(string) {
        return /^[a-zA-Z0-9]+$/.test(string);
    }
    isWhiteSpace(string) {
        return /\s/.test(string);
    }
    isNumeric(string) {
        return /^[0-9]+$/.test(string);
    }
    isSemi(string) {
        return string == ";";
    }
    peek(ahead = 0) {
        if (this.m_index + ahead >= this.m_src.length) {
            return "";
        }
        else {
            return this.m_src.charAt(this.m_index + ahead);
        }
    }
    consume() {
        return this.m_src.charAt(this.m_index++);
    }
    constructor(src) {
        this.m_src = src;
        this.m_index = 0;
    }
    tokenize() {
        let tokens = [];
        let buf = "";
        while (this.peek()) {
            // (this.peek());
            if (this.isAlpha(this.peek())) {
                buf += this.consume();
                while (this.peek() !== null &&
                    this.peek() !== undefined &&
                    this.isAlphaNumeric(this.peek())) {
                    (this.peek());
                    buf += this.consume();
                }
                if (buf == "return") {
                    tokens.push({ token: TokenType._return, value: buf });
                    buf = "";
                    continue;
                }
            }
            else if (this.isNumeric(this.peek())) {
                buf += this.consume();
                while (this.peek() !== null &&
                    this.peek() !== undefined &&
                    this.isNumeric(this.peek())) {
                    (this.peek());
                    buf += this.consume();
                    continue;
                }
                tokens.push({ token: TokenType.int_lit, value: buf });
                buf = "";
                continue;
            }
            else if (this.isSemi(this.peek())) {
                buf = this.consume();
                tokens.push({ token: TokenType.semi, value: buf });
                buf = '';
                continue;
            }
            else if (this.isWhiteSpace(this.peek())) {
                this.consume();
                continue;
            }
            else {
                console.error("wtf is that i donno that shii uk that u work with that i wont bish", this.peek());
                (0, process_1.exit)(1);
            }
        }
        this.m_index = 0;
        return tokens;
    }
}
exports.default = Tokenizer;
