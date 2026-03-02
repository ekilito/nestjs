import 'reflect-metadata';

interface ControllerOptions {
  prefix?: string;
}

// 其实可能给 Controller 传递路径前缀
// 前缀可以为空，也可写成空串，也可以写一个非空字符，也可能写一个对象

function Controller(): ClassDecorator; // 传空串
function Controller(prefix: string): ClassDecorator; // 路径前缀
function Controller(options: ControllerOptions): ClassDecorator; // 传递对象

function Controller(prefixOrOptions?: string | ControllerOptions): ClassDecorator {
  let options: ControllerOptions = {};
  // 如果 prefixOrOptions 是字符串类型，则将其赋值给 options.prefix
  if (typeof prefixOrOptions === 'string') {
    options.prefix = prefixOrOptions;
    // 如果 prefixOrOptions 是对象类型，则将其赋值给 options
  } else if (typeof prefixOrOptions === 'object') {
    options = prefixOrOptions;
  }

  // 这是一个类装饰器，装饰的控制器这个类
  // 返回一个类装饰器函数，使用 Reflect.defineMetadata 将 prefix 元数据定义在目标类上
  return (target: Function) => {
    // 给控制器类添加 prefix 路径前缀的元数据
    Reflect.defineMetadata('prefix', options.prefix || '', target);
  };
}

// 导出 Controller 装饰器函数
export { Controller };