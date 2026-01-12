// 参数装饰器

// 引入 reflect-metadata 库，用于反射元数据操作
import "reflect-metadata";

// 参数装饰器函数，用于验证方法参数
function validate(target: any, propertyKey: string, parameterIndex: number) { // parameterIndex: 参数在参数列表中的索引 （从0开始）
  // 获取现有的必需参数索引数组，如果不存在则初始化为空数组 从元数据中获取 "requiredParameters" 这个键对应的值 
  const existingRequiredParameters: number[] = Reflect.getOwnMetadata("requiredParameters", target, propertyKey) || [];
  // 将当前参数的索引添加到必需参数索引数组中
  existingRequiredParameters.push(parameterIndex);
  // 将更新后的必需参数索引数组存储到方法的元数据中 (元数据键 元数据值 目标对象（类原型） 目标属性（方法名）)
  Reflect.defineMetadata("requiredParameters", existingRequiredParameters, target, propertyKey);
}

// 方法装饰器函数，用于在方法调用时验证必需参数
function validateParameters(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  // 保存原始方法
  const method = descriptor.value;
  // 修改方法，使其在调用时验证必需参数
  descriptor.value = function (...args: any[]) {
    // 获取方法的必需参数索引数组
    const requiredParameters: number[] = Reflect.getOwnMetadata("requiredParameters", target, propertyKey) || [];
    console.log(requiredParameters); // [ 0 ]
    // 遍历必需参数索引数组，检查相应的参数是否为 undefined
    for (let parameterIndex of requiredParameters) {
      if (args[parameterIndex] === undefined) {
        // 如果必需参数为 undefined，则抛出错误
        throw new Error(`Missing required argument at position ${parameterIndex}`);
      }
    }
    // 调用原始方法并返回其结果
    return method.apply(this, args);
  };
}

// 定义 User 类
class User {
  // 构造函数，初始化 name 属性
  constructor(private name: string) { }
  // 使用 validateParameters 方法装饰器装饰 setName 方法
  @validateParameters
  setName(@validate newName: string) {
    // 设置新的 name 属性值
    this.name = newName;
  }
}
// 创建一个 User 实例
const user = new User("Alice");
// 调用 setName 方法，传入有效参数
user.setName("Bob"); // 正常
// 调用 setName 方法，传入 undefined 作为参数，触发参数验证错误
user.setName(undefined); // 抛出错误: Missing required argument at position 0
// 导出一个空对象，以避免模块级别作用域污染
export { }