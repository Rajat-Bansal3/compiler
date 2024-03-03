const readline = require('readline');
const { Lexer } = require('./lex.js');
const { Parser } = require('./parse.js');
const { Eval } = require('./evaluator.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter an expression: ', (expression) => {
  try{const lexer = new Lexer(expression);
  const tokens = lexer.tokenize();
  const parser = new Parser(tokens)
  const eval = new Eval(parser).evaluate()
  console.log('Tokens:', tokens);
  console.log('Tokens:', parser.parse());
  console.log(eval)

  rl.close();
}
catch(e){
    console.log(e.message)
}
});
