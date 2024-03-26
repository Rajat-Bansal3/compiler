"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const interfaces_1 = require("./interfaces");
class Parser {
    peek(ahead = 0) {
        if (this.m_index + ahead >= this.m_tokens.length) {
            return undefined;
        }
        else {
            return this.m_tokens[this.m_index + ahead];
        }
    }
    consume() {
        return this.m_tokens[this.m_index++];
    }
    constructor(tokens) {
        this.m_tokens = tokens;
        this.m_index = 0;
    }
    parse_exp() {
        var _a;
        if (((_a = this.peek()) === null || _a === void 0 ? void 0 : _a.token) == interfaces_1.TokenType.int_lit) {
            return { int_lit: this.consume() };
        }
        return; //placeholder
    }
    parse() {
        var _a, _b;
        let exit_node;
        while (this.peek()) {
            if (((_a = this.peek()) === null || _a === void 0 ? void 0 : _a.token) === interfaces_1.TokenType._return) {
                this.consume();
                let node_expr;
                if ((node_expr = this.parse_exp())) {
                    exit_node = { expr: node_expr };
                }
            }
            else {
                console.error("What kind of input is that brother give a good expression how can u input an expressoin worng");
                (0, process_1.exit)(1);
            }
            if (this.peek() || ((_b = this.peek()) === null || _b === void 0 ? void 0 : _b.token) == interfaces_1.TokenType.semi) {
                this.consume();
            }
            else {
                console.error("What kind of input is that brother give a good expression how can u input an expressoin worng");
                (0, process_1.exit)(1);
            }
        }
        this.m_index = 0;
        return exit_node;
    }
}
exports.default = Parser;
