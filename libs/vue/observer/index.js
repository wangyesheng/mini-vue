import Observer from "./Observer";

export function initState(vm) {
  const options = vm.$options;
  if (options.data) {
    initData(vm);
  }
  if (options.computed) {
    initComputed(vm);
  }
  if (options.watch) {
    initWatch(vm);
  }
}

function initData(vm) {
  let data = vm.$options.data;
  data = vm._data = typeof data === "function" ? data.call(vm) : data || {};
  for (let key in data) {
    defineProxy(vm, key, "_data");
  }
  observer(vm._data);
}

export function observer(data) {
  if (typeof data !== "object" || data == null) return;
  return new Observer(data);
}

function defineProxy(vm, key, source) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key];
    },
    set(newValue) {
      vm[source][key] = newValue;
    },
  });
}

function initComputed(params) {}

function initWatch(params) {}
