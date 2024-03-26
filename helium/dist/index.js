"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const process_1 = require("process");
const tokenizer_1 = __importDefault(require("./tokenizer"));
var TokenType;
(function (TokenType) {
    TokenType[TokenType["_return"] = 0] = "_return";
    TokenType[TokenType["int_lit"] = 1] = "int_lit";
    TokenType[TokenType["semi"] = 2] = "semi";
})(TokenType || (TokenType = {}));
function tokenToAsm(tokens) {
    let output = "global _start\n_start:\n";
    for (let index = 0; index < tokens.length; index++) {
        const element = tokens[index];
        if (element.token === TokenType._return) {
            if (index + 1 < tokens.length &&
                tokens[index + 1].token === TokenType.int_lit) {
                if (index + 2 < tokens.length &&
                    tokens[index + 2].token === TokenType.semi) {
                    output += "   mov rax, 60\n";
                    output += `   mov rdi, ${tokens[index + 1].value}\n`;
                    output += "   syscall \n";
                }
            }
        }
    }
    return output;
}
function main(argv) {
    return __awaiter(this, void 0, void 0, function* () {
        if (argv.length != 3) {
            console.error("Incorrect usage u can run it by using it like .... \n");
            console.error("He <inputFileName.he> \n");
            (0, process_1.exit)(1);
        }
        const tokens = yield new tokenizer_1.default(yield fs_1.default.readFileSync(argv[2], "utf8"));
        // console.log(tokens);
        const res = yield tokens.tokenize();
        console.log(res); // Add debug statement
        console.log(tokenToAsm(res)); // Add debug statement
        const filename = "../resByRunning/output.asm";
        fs_1.default.mkdirSync("../resByRunning", { recursive: true });
        fs_1.default.writeFileSync(filename, tokenToAsm(res));
        (0, process_1.exit)(0);
        (0, process_1.exit)(0);
    });
}
console.log("strat");
main(process.argv);
