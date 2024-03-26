import { nodeExit } from "./interfaces";

class generator {
  private m_root: nodeExit | undefined;

  constructor(root: nodeExit | undefined) {
    this.m_root = root;
  }
  generate(): string {
    console.log("here")
    let output: string = "global _start\n_start:\n";
    output += "   mov rax, 60\n";
    output += `   mov rdi, ${this.m_root?.expr.int_lit.value}\n`;
    output += "   syscall \n";
    return output;
  }
}
export default generator