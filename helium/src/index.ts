import fs from "fs";
import { exit } from "process";

enum TokenType {
  _return,
  int_lit,
  semi,
}

interface Token {
  token: TokenType;
  value?: string;
}
function Tokenize(input: string): Token[] {
  let tokens: Token[] = [];
  let buf: string = "";
  for (let index = 0; index < input.length; index++) {
    const element = input[index];
    if (isAlpha(element)) {
      buf += element;
      index++;
      while (isAlphaNumeric(input[index])) {
        buf += input[index];
        index++;
      }
      index--;
      if (buf == "return") {
        tokens.push({ token: TokenType._return });
        buf = "";
        continue;
      } else {
        console.error(
          "wtf is that i donno that shii uk that u work with that i wont bish"
        );
        exit(1);
      }
    } else if (isNumeric(element)) {
      buf += element;
      index++;
      while (isNumeric(input[index])) {
        buf += input[index];
        index++;
      }
      index--;
      tokens.push({ token: TokenType.int_lit, value: buf });
      buf = "";
    } else if (isSemi(element)) {
      tokens.push({ token: TokenType.semi });
    } else if (isWhiteSpace(element)) {
      continue;
    } else {
      console.error(
        "wtf is that i donno that shii uk that u work with that i wont bish"
      );
      exit(1);
    }
  }
  return tokens;
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
function main(argv: string[]) {
  if (argv.length != 3) {
    console.error("Incorrect usage u can run it by using it like .... \n");
    console.error("He <inputFileName.he> \n");
    exit(1);
  }

  const res = Tokenize(fs.readFileSync(argv[2], "utf8"));
  console.log(res);
  console.log(tokenToAsm(res));
  const filename = "../resByRunning/output.asm"
  fs.mkdirSync("../resByRunning" , {recursive : true})
  fs.writeFileSync(filename,tokenToAsm(res))
  exit(0);
}
main(process.argv);
//utility functions
function isAlpha(string: string) {
  return /^[a-zA-Z]+$/.test(string);
}
function isAlphaNumeric(string: string) {
  return /^[a-zA-Z0-9]+$/.test(string);
}
function isWhiteSpace(string: string) {
  return /\s/.test(string);
}
function isNumeric(string: string) {
  return /^[0-9]+$/.test(string);
}
function isSemi(string: string) {
  return string == ";";
}
function getTokenTypeName(token: TokenType): string {
  switch (token) {
    case TokenType._return:
      return "_return";
    case TokenType.int_lit:
      return "int_lit";
    case TokenType.semi:
      return "semi";
    default:
      return "Unknown";
  }
}
