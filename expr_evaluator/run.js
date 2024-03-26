const readline = require('readline');
const { Lexer } = require('./lex.js');
const { Parser } = require('./parse.js');
const { Evaluator } = require('./evaluator.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter an expression: ', (expression) => {
  try{const lexer = new Lexer(expression);
  const tokens = lexer.tokenize();
  const parser = new Parser(tokens)
  const data = parser.parse()
  const eval = new Evaluator();
  const res = eval.evaluate(data);
  console.log('Tokens:', tokens);
  console.log('parsed:', data);
  console.log('evaluated:', res);

  rl.close();
}
catch(e){
    console.log(e.message)
}
});
