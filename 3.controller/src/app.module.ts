import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// import { UserController } from './user.controller';
import { LoggerClassService, LoggerService, UseValueService, UseFactory } from './logger.service';

@Module({
  controllers: [AppController],
  providers: [
    {
      provide: 'SUFFIX',
      useValue: 'suffix'
    },
    LoggerClassService, // 这样定义的 provider，token值就是这个类的本身
    {
      provide: LoggerService,
      useClass: LoggerService // 说明提供的是一个类
    },
    // 这也是一个定义provide的方法
    {
      provide: 'StringToken', // 这是一个token，也称为标志，或者说令牌，也就是 provider的名字
      useValue: new UseValueService('prefix') // 可以直接提供一个值
    },
    {
      provide: 'FactoryToken',
      inject: ['prefix1', 'SUFFIX'],
      useFactory: (prefix1, suffix) => new UseFactory(prefix1, suffix)
    }
  ]
})


export class AppModule { }