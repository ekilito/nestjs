const logged = (value, context) => {
  console.log('value', value);
  console.log('context', context);
  if (context.kind === 'getter' || context.kind === 'setter') { // 说明这是一个类的访问器装饰器
    return function (...args) {
      console.log(`starting ${context.name} with arguments ${args.join(", ")}`); // starting x with arguments 1
      const ret = value.call(this, ...args);
      console.log(`ending ${context.name}`); // ending x
      return ret;
    }
  }
}

class Class {
  @logged
  set x(arg) { }
  @logged
  get x() { return 2 }
}

let clazz = new Class();
clazz.x = 1;
console.log(clazz.x);

export { }