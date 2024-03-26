"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class generator {
    constructor(root) {
        this.m_root = root;
    }
    generate() {
        var _a;
        console.log("here");
        let output = "global _start\n_start:\n";
        output += "   mov rax, 60\n";
        output += `   mov rdi, ${(_a = this.m_root) === null || _a === void 0 ? void 0 : _a.expr.int_lit.value}\n`;
        output += "   syscall \n";
        return output;
        // return this.m_root.expr.int_lit.value;
    }
}
exports.default = generator;
