
type ClassMethodDecorator = (value: Function, context: {
  kind: 'method', // 被装饰的值的类型 可以是 class method getter setter field accessor 之一
  name: string, // 表示被装饰的值的名称
  static: boolean, // 表示被装饰的值是否是静态的
  private: boolean, // 表示被装饰的值是否是私有的
}) => Function | void;


const logged = (value, context) => {
  console.log('value', value);  // [Function: sum]
  console.log('context', context);
  if (context.kind === 'method') { // 说明这是一个类的方法装饰器
    return function (...args) {
      console.log(`starting ${context.name} with arguments ${args.join(", ")}`); // starting sum with arguments 1, 2
      const ret = value.call(this, ...args);
      console.log(`ending ${context.name}`); // ending sum
      return ret;
    }
  }
}

class Class {
  @logged
  sum(a, b) {
    return a + b;
  }
}

const result = new Class().sum(1, 2);
console.log(result)