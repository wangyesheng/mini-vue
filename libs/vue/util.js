// 匹配 {{ xxx }}
const defaultRege = /\{\{((?:.|\r?\n)+?)\}\}/g;

export const util = {
  getValue(vm, expr) {
    const keys = expr.split(".");
    return keys.reduce((memo, current) => {
      memo = memo[current];
      return memo;
    }, vm);
  },
  compilerText(node, vm) {
    // 编译文本，替换{{}}
    node.textContent = node.textContent.replace(defaultRege, (...args) => {
      return this.getValue(vm, args[1]);
    });
  },
};
