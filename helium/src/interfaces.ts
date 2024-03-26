export enum TokenType {
  _return,
  int_lit,
  semi,
}

export interface Token {
  token: TokenType;
  value?: string;
}

export interface nodeExpression {
  int_lit: Token;
}

export interface nodeExit {
  expr: nodeExpression;
}
