import { observer } from ".";

const oldArrayPrototype = Array.prototype;
const newArrayPrototype = Object.create(oldArrayPrototype);

const Methods = [
  "push",
  "unshift",
  "pop",
  "shift",
  "reverse",
  "sort",
  "splice",
];

function observerArray(inserted) {
  for (let i = 0; i < inserted.length; i++) {
    observer(inserted[i]);
  }
}

Methods.forEach((method) => {
  newArrayPrototype[method] = function(...args) {
    const result = oldArrayPrototype[method].apply(this, args);
    // 对数组中新增的内容进行观测（假设是对象）
    let inserted;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2); // 获取 splice 新增的内容
        break;
      default:
        break;
    }
    observerArray(inserted);
    console.warn(`Array method ${method} is called`);
    return result;
  };
});

export { newArrayPrototype, observerArray };
