import { observer } from "./index";
import { newArrayPrototype, observerArray } from "./array";
import Dep from "./dep";

class Observer {
  constructor(data) {
    if (Array.isArray(data)) {
      data.__proto__ = newArrayPrototype;
      observerArray(data);
    } else {
      this.walk(data);
    }
  }
  walk(data) {
    const keys = Object.keys(data);
    for (let i = 0, length = keys.length; i < length; i++) {
      const key = keys[i];
      defineReactive(data, key, data[key]);
    }
  }
}

export function defineReactive(data, key, value) {
  observer(value);
  const dep = new Dep();
  Object.defineProperty(data, key, {
    get() {
      console.log("getter");
      if (Dep.target) {
        dep.depend();
        // dep.addSub(Dep.target);
      }
      return value;
    },
    set(newValue) {
      console.log("setter");
      if (newValue === value) return;
      value = newValue;
      dep.notify();
    },
  });
}

export default Observer;
