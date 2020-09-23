import Vue from "../libs/vue";

const vm = new Vue({
  el: "#app",
  data() {
    return {
      name: "Mini Vue",
      version: "0.0.1",
      authorInfo: {
        name: "wangyesheng",
        profession: "programmer",
      },
      companys: [{ name: "byte" }, "alipay", "tencent", "baidu"],
    };
  },
  computed: {},
  watch: {},
});

// console.log(vm.version);
// vm.version = '2.0'
// console.log(vm.version);

// vm.companys.unshift({ name: "byte" });
// console.log();

// vm.companys[0].name = 'element'