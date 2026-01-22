// 类自动访问器装饰器是一种新的类元素类型
// 它在类的字段前添加 accessor 关键字
// 自动访问器自动为字段创建 setter 和 getter方法，并将默认值存储在一个私有槽中

type ClassAutoAccessorDecorator = (
  value: {
    get: () => unknown;
    set(value: unknown);
  },
  context: {
    kind: "accessor";
    name: string | symbol;
    access: { get(): unknown, set(value: unknown): void };
    static: boolean;
    private: boolean;
    addInitializer(initializer: () => void): void;
  }
) => {
  get?: () => unknown;
  set?: (value: unknown) => void;
  init?: (initialValue: unknown) => unknown;
} | void;

const logged = (value, context) => {
  console.log('value', value); // { get: [Function: get x], set: [Function: set x] }
  console.log('context', context);
  if (context.kind === "accessor") {
    let { get, set } = value;
    return {
      get() {
        console.log(`getting ${context.name}`);
        return get.call(this);
      },
      set(val) {
        console.log(`setting ${context.name} to ${val}`);
        return set.call(this, val);
      },
      init(initialValue) {
        console.log(`initializing ${context.name} with value ${initialValue}`);
        return initialValue;
      }
    };
  }
}

class Class {
  @logged accessor x = 1;
}

let clazz = new Class();
// initializing x with value 1
clazz.x;
// getting x
clazz.x = 123;
// setting x to 123
export { }