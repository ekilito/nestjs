import { Injectable, Inject } from '@nestjs/common';
// @Injectable() 的作用：标记类可以被 NestJS 的依赖注入容器管理
// @Inject() 的作用：指定要从容器中获取的 token（当 token 不是类时必需）

@Injectable()
export class LoggerClassService {
  // 无参数 可以直接实例化，不需要额外依赖
  log(message) {
    console.log('LoggerClassService', message)
  }
}
@Injectable()
export class LoggerService {
  // @Inject('SUFFIX')：告诉 NestJS 要从容器中获取 token 为 'SUFFIX' 的值
  // 依赖来源：从 'SUFFIX' provider 获取值（useValue: 'suffix'）
  constructor(@Inject('SUFFIX') private suffix: string) {
    console.log('LoggerService', this.suffix)
  }
  log(message) {
    console.log('LoggerService', message)
  }
}

@Injectable()
export class UseValueService {
  // 普通参数 // 注意：没有 @Inject
  // 因为它是通过 useValue 直接实例化的： useValue: new UseValueService('prefix')  // 手动传入 'prefix'
  constructor(prefix: string) {
    console.log('UseValueService', prefix)
  }
  log(message) {
    console.log('UseValueService', message)
  }
}

@Injectable()
export class UseFactory {
  // 通过工厂函数的 inject 数组指定：
  // inject: ['prefix1', 'SUFFIX'],  // 指定要注入的 token
  // useFactory: (prefix1, suffix) => new UseFactory(prefix1, suffix)
  constructor(private prefix1: string, private suffix: string) {
    console.log('UseFactory', prefix1, suffix)
  }
  log(message) {
    console.log('UseFactory', this.suffix)
  }
}