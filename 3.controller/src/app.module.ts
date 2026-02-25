import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// import { UserController } from './user.controller';
import { LoggerClassService, LoggerService, UseValueService, UseFactory } from './logger.service';

@Module({
  controllers: [AppController],
  providers: [
    {
      provide: 'SUFFIX', // 提供 token 为 'SUFFIX' 的值
      useValue: 'suffix'  // 值为 'suffix'
    },
    LoggerClassService, // 这样定义的 provider，token值就是这个类的本身 是下面简写的形式 注入方式：直接通过类型注入 private loggerClassService: LoggerClassService
    {
      provide: LoggerService, // 明确指定 token 和要使用的类
      useClass: LoggerService // 说明提供的是一个类  注入方式：通过类型注入 private loggerService: LoggerService
    },
    // 这也是一个定义provide的方法
    {
      provide: 'StringToken', // 这是一个token，也称为标志，或者说令牌，也就是 provider的名字 token：字符串 'StringToken'
      useValue: new UseValueService('prefix') // 可以直接提供一个值 直接提供一个已经实例化的对象 注入方式：必须使用 @Inject('StringToken') 装饰器
    },
    {
      provide: 'FactoryToken',
      inject: ['prefix1', 'SUFFIX'], // 指定依赖的其他 provider
      useFactory: (prefix1, suffix) => new UseFactory(prefix1, suffix) // 注入方式：使用 @Inject('FactoryToken')
    }
  ]
})

// 类作为 token：可以直接通过类型注入
// 字符串作为 token：必须用 @Inject() 指定注入方式


export class AppModule { }