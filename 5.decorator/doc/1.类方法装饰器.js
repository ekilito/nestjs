const logged = (value, context) => {
  console.log("value", value); // [Function: sum]
  console.log("context", context);
  if (context.kind === "method") {
    // 说明这是一个类的方法装饰器
    return function (...args) {
      console.log(`starting ${context.name} with arguments ${args.join(", ")}`); // starting sum with arguments 1, 2
      const ret = value.call(this, ...args);
      console.log(`ending ${context.name}`); // ending sum
      return ret;
    };
  }
};

class Class {
  sum(a, b) {
    return a + b;
  }
}

Class.prototype.sum = logged(Class.prototype.sum, {
    kind: "method",
    name: "sum",
  }) ?? Class.prototype.sum;

console.log(new Class().sum(1, 2));

// Class.prototype.sum 被装饰的值

