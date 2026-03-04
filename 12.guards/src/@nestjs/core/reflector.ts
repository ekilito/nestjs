import 'reflect-metadata';
import { SetMetadata } from '@nestjs/common';

export class Reflector {
  // 定义 get 方法，用于获取元数据
  get<T extends any>(metadataKey: any, target: any, key?: string): T {
    // 如果 key 存在，从 target 的 key 上获取元数据，否则从 target 上获取元数据
    return key
      ? Reflect.getMetadata(metadataKey, target, key)
      : Reflect.getMetadata(metadataKey, target);
  }

  // 静态方法 createDecorator，用于创建装饰器
  static createDecorator<T = any>() {
    // 定义装饰器函数
    function decoratorFn(metadataValue: T) {
      // 返回装饰器函数
      return (target: object, key?: string | symbol, descriptor?: TypedPropertyDescriptor<any>) => {
        // 使用 SetMetadata 设置元数据
        SetMetadata(decoratorFn, metadataValue)(target, key, descriptor);
      };
    }
    // 返回装饰器函数
    return decoratorFn;
  }
}
