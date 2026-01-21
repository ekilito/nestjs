class Class {
  set x(arg) {}
  get x() {
    return 2;
  }
}

// 获取类的原型上的 get 和 set 方法
let { set, get } = Object.getOwnPropertyDescriptor(Class.prototype, "x");

const logged = (value, context) => {
  if (context.kind === "getter" || context.kind === "setter") {  // 说明这是一个类的访问器装饰器
    return function (...args) {
      console.log(`starting ${context.name} with arguments ${args.join(", ")}`); // starting x with arguments 1
      const ret = value.call(this, ...args);
      console.log(`ending ${context.name}`); // ending x
      return ret;
    };
  }
};

set = logged(set, { kind: "setter", name: "x" }) ?? set;
get = logged(get, { kind: "getter", name: "x" }) ?? get;
Object.defineProperty(Class.prototype, "x", { set, get });

let clazz = new Class();
clazz.x = 1;
console.log(clazz.x);
export {};
