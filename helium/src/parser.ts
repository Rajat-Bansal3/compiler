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

interface nodeExpression {
  int_lit: Token;
}

interface nodeExit {
  expr: nodeExpression;
}

class Parser {
  private m_tokens: Token[];
  private m_index: number;
  private peek(ahead: number = 0): Token | undefined {
    if (this.m_index + ahead >= this.m_tokens.length) {
      return undefined;
    } else {
      return this.m_tokens[this.m_index + ahead];
    }
  }
  private consume(): Token {
    return this.m_tokens[this.m_index++];
  }

  constructor(tokens: Token[]) {
    this.m_tokens = tokens;
    this.m_index = 0;
  }

  parse_exp(): nodeExpression | undefined {
    if (this.peek()?.token == TokenType.int_lit) {
      return { int_lit: this.consume() };
    }
    return; //placeholder
  }

  parse(): nodeExit | undefined {
    let exit_node: nodeExit | undefined;
    while (this.peek()) {
      if (this.peek()?.token === TokenType._return) {
        this.consume();
        let node_expr;
        if ((node_expr = this.parse_exp())) {
          exit_node = { expr: node_expr };
        }
      } else {
        console.error(
          "What kind of input is that brother give a good expression how can u input an expressoin worng"
        );
        exit(1)
      }
    }
    if (!this.peek() || this.peek()?.token === TokenType.semi) {
      console.error(
        "What kind of input is that brother give a good expression how can u input an expressoin worng"
      );
      exit(1)

    }
    this.m_index = 0;
    return exit_node;
  }
}
