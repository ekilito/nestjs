// 方法装饰器

/**
 * target: 类的原型（对于静态方法是构造函数）
 * propertyKey: 方法名（这里是 "add"）
 * descriptor: 方法的属性描述符（包含方法的信息）
 */

function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(target) // {}
  console.log(propertyKey) // add
  console.log(descriptor) // { value: [Function: add], writable: true, enumerable: false, configurable: true }
  // 1. 保存原始方法
  const originalMethod = descriptor.value; // [Function: add]
  // 2. 用新函数替换原始方法
  descriptor.value = function (...args: any[]) {
    // 2.1 记录调用信息
    console.log(`Calling ${propertyKey} with arguments: ${args}`); // Calling add with arguments: 2,3
    // 2.2 调用原始方法 (这里实际上调用的是闭包中的 originalMethod)
    //  const result = (function(a, b) { return a + b; }).apply(this, args);
    const result = originalMethod.apply(this, args); // (原始方法执行: return 2 + 3; → 5)
    // 2.3 记录结果
    console.log(`Result: ${result}`);  // Result: 5
    // 2.4 返回结果
    return result;
  };
  // 3. 返回修改后的描述符
  return descriptor;
}


class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(2, 3);

// PropertyDescriptor 结构
interface PropertyDescriptor {
  value?: any;              // 方法本身
  writable?: boolean;       // 是否可写
  enumerable?: boolean;     // 是否可枚举
  configurable?: boolean;   // 是否可配置
  get?(): any;             // getter
  set?(v: any): void;      // setter
}

// const result = originalMethod.apply(this, args);
// apply(): 调用函数，允许指定 this 值和参数数组
// this: 指向当前的 Calculator 实例（calc）
// args: 传入的参数数组 [2, 3]