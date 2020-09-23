import { pushTarget, popTarget } from "./dep";

let id = 0; // 每次产生一个 Watcher 都需要有一个唯一的标识
class Watcher {
  /**
   * @param {*} vm 当前组件实例 new Vue() 产生的
   * @param {*} exprOrFn 用户传入的表达式或者函数
   * @param {*} cb 用户传入的回调函数 vm.$watch()
   * @param {*} opts 其他参数
   */
  constructor(vm, exprOrFn, cb = () => {}, opts = {}) {
    this.id = id++;
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    if (typeof exprOrFn === "function") {
      this.getter = exprOrFn;
    }
    this.cb = cb;
    this.opts = opts;
    this.deps = [];
    this.depIds = new Set();

    this.get();
  }

  get() {
    pushTarget(this);
    this.getter();
    popTarget();
  }
  addDep(dep) {
    let id = dep.id;
    if (!this.depIds.has(id)) {
      this.depIds.add(id);
      this.deps.push(dep);
      dep.addSub(this);
    }
  }
  update() {
    this.get();
  }
}

export default Watcher;
