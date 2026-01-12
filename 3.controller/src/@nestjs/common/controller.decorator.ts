// 导入 reflect-metadata 库
import 'reflect-metadata';
// 定义 ControllerOptions 接口，包含一个可选的 prefix 属性
interface ControllerOptions {
  prefix?: string;
}
// 定义 Controller 装饰器函数，可以没有参数
function Controller(): ClassDecorator;
// 定义 Controller 装饰器函数，可以接受一个字符串类型的 prefix 参数
function Controller(prefix: string): ClassDecorator;
// 定义 Controller 装饰器函数，可以接受一个 ControllerOptions 类型的 options 参数
function Controller(options: ControllerOptions): ClassDecorator;
// 定义 Controller 装饰器函数，可以接受一个字符串或 ControllerOptions 类型的参数
function Controller(prefixOrOptions?: string | ControllerOptions): ClassDecorator {
  // 初始化一个空的 options 对象
  let options: ControllerOptions = {};
  // 如果 prefixOrOptions 是字符串类型，则将其赋值给 options.prefix
  if (typeof prefixOrOptions === 'string') {
    options.prefix = prefixOrOptions;
    // 如果 prefixOrOptions 是对象类型，则将其赋值给 options
  } else if (typeof prefixOrOptions === 'object') {
    options = prefixOrOptions;
  }
  // 返回一个类装饰器函数，使用 Reflect.defineMetadata 将 prefix 元数据定义在目标类上
  return (target: Function) => {
    Reflect.defineMetadata('prefix', options.prefix || '', target);
  };
}
// 导出 Controller 装饰器函数
export { Controller };