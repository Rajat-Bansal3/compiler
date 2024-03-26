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
const child_process_1 = require("child_process");
const tokenizer_1 = __importDefault(require("./tokenizer"));
const generator_1 = __importDefault(require("./generator"));
const parser_1 = __importDefault(require("./parser"));
function main(argv) {
    return __awaiter(this, void 0, void 0, function* () {
        if (argv.length != 3) {
            console.error("Incorrect usage u can run it by using it like .... \n");
            console.error("He <inputFileName.he> \n");
            (0, process_1.exit)(1);
        }
        const tokens = new tokenizer_1.default(fs_1.default.readFileSync(argv[2], "utf8"));
        const res = tokens.tokenize();
        console.log(res);
        const parse = new parser_1.default(res);
        console.log(parse.parse());
        const gen = new generator_1.default(parse.parse());
        const currAssembly = gen.generate();
        const filename = "../resByRunning/output.asm";
        fs_1.default.mkdirSync("../resByRunning", { recursive: true });
        fs_1.default.writeFileSync(filename, currAssembly);
        const com1 = "nasm -felf64 ../resByRunning/output.asm";
        const com2 = "ld -o ../resByRunning/output ../resByRunning/output.o ";
        (0, child_process_1.exec)(com1, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Command encountered an error: ${stderr}`);
                return;
            }
            console.log(`Command output:\n${stdout}`);
        });
        (0, child_process_1.exec)(com2, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Command encountered an error: ${stderr}`);
                return;
            }
            console.log(`Command output:\n${stdout}`);
        });
        (0, process_1.exit)(0);
    });
}
console.log("strat");
main(process.argv);
