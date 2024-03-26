import fs from "fs";
import { exit } from "process";
import Tokenizer from "./tokenizer";
import { Token , TokenType } from "./interfaces";
import generator from "./generator";
import Parser from "./parser";

async function main(argv: string[]) {
  if (argv.length != 3) {
    console.error("Incorrect usage u can run it by using it like .... \n");
    console.error("He <inputFileName.he> \n");
    exit(1);
  }
  const tokens = await new Tokenizer(await fs.readFileSync(argv[2], "utf8"));
  const res = await tokens.tokenize();
  console.log(res);

  const parse = new Parser(res)
  console.log(parse.parse())
  const gen = new generator(parse.parse())
  const currAssembly = gen.generate() 

  const filename = "../resByRunning/output.asm"
  fs.mkdirSync("../resByRunning" , {recursive : true})
  fs.writeFileSync(filename,currAssembly)
  exit(0);
}
console.log("strat");
main(process.argv);
