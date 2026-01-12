// 引入 reflect-metadata 库，该库用于在 TypeScript 中添加元数据
import 'reflect-metadata';
// 定义一个名为 Get 的函数，该函数接受一个字符串参数 path，默认值为空字符串
// Get 函数返回一个方法装饰器 MethodDecorator
export function Get(path: string = ''): MethodDecorator {
  // 返回一个方法装饰器，该装饰器接受三个参数：目标对象、属性键和属性描述符
  return (target, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    // 使用 Reflect.defineMetadata 函数为属性描述符的值（即方法）定义 'path' 元数据
    Reflect.defineMetadata('path', path, descriptor.value);
    // 使用 Reflect.defineMetadata 函数为属性描述符的值（即方法）定义 'method' 元数据，值为 'GET'
    Reflect.defineMetadata('method', 'GET', descriptor.value);
  };
}