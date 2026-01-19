import 'reflect-metadata';

// Get 函数返回一个方法装饰器 MethodDecorator
export function Get(path: string = ''): MethodDecorator {
  // 返回一个方法装饰器，该装饰器接受三个参数：目标对象、属性键和属性描述符
  /**
   * target 类原型 AppController.prototype
   * propertyKey 方法名
   * descriptor index 方法的属性描述器
   */

  return (target, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    // 为 descriptor.value （属性描述符的值）（即方法）定义 'path' 元数据  path=path (descriptor.value.path = path)
    Reflect.defineMetadata('path', path, descriptor.value);
    // 为属性描述符的值（即方法）定义 'method' 元数据，值为 'GET'  method=GET  (descriptor.value.method = GET)
    Reflect.defineMetadata('method', 'GET', descriptor.value);
  };
}

export function Post(path: string = ''): MethodDecorator {
  return (target, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata('path', path, descriptor.value);
    Reflect.defineMetadata('method', 'POST', descriptor.value);
  };
}