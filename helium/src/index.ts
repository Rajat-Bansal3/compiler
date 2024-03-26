import fs from "fs";
import { exit } from "process";
import Tokenizer from "./tokenizer";
enum TokenType {
  _return,
  int_lit,
  semi,
}

interface Token {
  token: TokenType;
  value?: string;
}
function tokenToAsm(tokens: Token[]): string {
  let output: string = "global _start\n_start:\n";
  for (let index = 0; index < tokens.length; index++) {
    const element = tokens[index];
    if (element.token === TokenType._return) {
      if (
        index + 1 < tokens.length &&
        tokens[index + 1].token === TokenType.int_lit
      ) {
        if (
          index + 2 < tokens.length &&
          tokens[index + 2].token === TokenType.semi
        ) {
          output += "   mov rax, 60\n";
          output += `   mov rdi, ${tokens[index + 1].value}\n`;
          output += "   syscall \n";
        }
      }
    }
  }
  return output;
}
async function main(argv: string[]) {
  if (argv.length != 3) {
    console.error("Incorrect usage u can run it by using it like .... \n");
    console.error("He <inputFileName.he> \n");
    exit(1);
  }
  const tokens = await new Tokenizer(await fs.readFileSync(argv[2], "utf8"));
  const res = await tokens.tokenize();
  console.log(res);
  console.log(tokenToAsm(res));
  const filename = "../resByRunning/output.asm"
  fs.mkdirSync("../resByRunning" , {recursive : true})
  fs.writeFileSync(filename,tokenToAsm(res))
  exit(0);
  exit(0);
}
console.log("strat");
main(process.argv);
