import fs from "fs";
import { exit } from "process";
import { exec } from "child_process";

import Tokenizer from "./tokenizer";
import generator from "./generator";
import Parser from "./parser";

async function main(argv: string[]) {
  if (argv.length != 3) {
    console.error("Incorrect usage u can run it by using it like .... \n");
    console.error("He <inputFileName.he> \n");
    exit(1);
  }
  const tokens = new Tokenizer(fs.readFileSync(argv[2], "utf8"));
  const res = tokens.tokenize();
  console.log(res);

  const parse = new Parser(res);
  console.log(parse.parse());
  const gen = new generator(parse.parse());
  const currAssembly = gen.generate();

  const filename = "../resByRunning/output.asm";
  fs.mkdirSync("../resByRunning", { recursive: true });
  fs.writeFileSync(filename, currAssembly);

  const com1: string = "nasm -felf64 ../resByRunning/output.asm";
  const com2: string = "ld -o ../resByRunning/output ../resByRunning/output.o ";
  exec(com1, (error, stdout, stderr) => {
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
  exec(com2, (error, stdout, stderr) => {
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

  exit(0);
}
console.log("strat");
main(process.argv);
