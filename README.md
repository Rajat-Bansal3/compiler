# My Programming Language Compiler Project

This repository contains a project for building a compiler for a custom programming language, along with other related materials.

## Overview

The project is structured as follows:

- `expr_evaluator`: Contains a basic expression evaluator implemented in JavaScript.
- `asm`: Contains assembly code used for learning and experimentation.
- `helium`: Contains code for the "Helium" programming language implemented in TypeScript.

## Contents

### `expr_evaluator`

This directory contains a basic expression evaluator implemented in JavaScript. It provides functionality for evaluating arithmetic expressions and serves as a starting point for building a more complex compiler.

### `asm`

This directory contains assembly code files used for learning purposes. These files demonstrate various assembly language concepts and may include examples related to compiler development.

### `helium`

This directory contains the code for the "Helium" programming language implemented in TypeScript. It includes the lexer, parser, semantic analyzer, code generator, and other components necessary for compiling Helium code.

## Usage

### Running the Expression Evaluator (JavaScript)

To run the expression evaluator implemented in JavaScript, follow these steps:

1. Navigate to the `expr_evaluator` directory.
2. Make sure you have Node.js installed on your machine.
3. Open a terminal or command prompt.
4. Run the following command:

    ```bash
    node run.js
    ```

   This will execute the expression evaluator, allowing you to input expressions and evaluate them.

### Running the Helium Compiler (TypeScript)

To run the Helium compiler implemented in TypeScript, follow these steps:

1. Navigate to the `helium` directory.
2. Ensure you have TypeScript installed globally. If not, run the following command:

    ```bash
    sudo npm install -g typescript
    ```

3. Install the required dependencies by running the following command:

    ```bash
    npm install
    ```

4. After installing dependencies, transpile the TypeScript code to JavaScript by running the following command:

    ```bash
    tsc -b
    ```

   This will generate the compiled JavaScript files in the `dist/` directory.

5. Place a file  in the `dist` folder. This file serves as the input file for Helium code.

6. now u can test the file currently only returning error codes by writting in `{your input file}` `return {any number of ur choice lower than 255 } ;` 
7. and u can test the code by runnig the dist js file with your input as arg for me it was `node index.js ./hex`
## Contributors

- [rajat bansal](https://github.com/Rajat-Bansal3)

Feel free to contribute to the project by submitting pull requests or reporting issues.
