import { initState } from "./observer";
import Watcher from "./observer/Watcher";
import { util } from "./util";

function Vue(options) {
  this._init(options);
}

Vue.prototype._init = function(options) {
  const vm = this;
  vm.$options = options;
  initState(vm);

  if (vm.$options.el) {
    vm.$mount();
  }
};

function query(el) {
  if (typeof el === "string") {
    return document.querySelector(el);
  }
  return el;
}

Vue.prototype.$mount = function() {
  const vm = this;
  let el = vm.$options.el;
  el = vm.$el = query(el);

  const updateComponent = () => {
    console.log("execute");
    vm._update();
  };
  new Watcher(vm, updateComponent);
};

Vue.prototype._update = function() {
  const el = this.$el;
  let node = document.createDocumentFragment();
  let firstChild;
  while ((firstChild = el.firstChild)) {
    node.appendChild(firstChild);
  }
  compiler(node, this);
  el.appendChild(node);
};

function compiler(node, vm) {
  [].forEach.call(node.childNodes, (child) => {
    // 1 元素  3 文本
    if (child.nodeType === 1) {
      compiler(child, vm);
    } else if (child.nodeType === 3) {
      util.compilerText(child, vm);
    }
  });
}

export default Vue;

// function create() {
//   var Con = [].shift.apply(arguments);
//   var obj = {};
//   obj.__proto__ = Con.prototype;
//   var result = Con.apply(obj, arguments);
//   return result instanceof Object ? result : obj;
// }
