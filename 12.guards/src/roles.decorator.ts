import { SetMetadata } from '@nestjs/common';

// 定义一个名为 Roles 的函数，该函数接收任意数量的字符串参数并返回一个装饰器
export const Roles = (...roles: string[]) =>
  // 调用 SetMetadata 函数，将键 'roles' 和角色数组作为元数据设置在目标上
  SetMetadata('roles', roles);


//  function decorator(target, propertyKey, descriptor) {
//   Reflect.defineMetadata('roles', ['admin'], descriptor.value);
//  }
