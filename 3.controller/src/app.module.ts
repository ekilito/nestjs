import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// import { UserController } from './user.controller';
import { LoggerService, UseValueService } from './logger.service';

@Module({
  controllers: [AppController],
  providers: [
    LoggerService,
    // 这也是一个定义provide的方法
    {
      provide: 'StringToken', // 这是一个token，也称为标志，或者说令牌，也就是 provider的名字
      useValue: new UseValueService() // 可以直接提供一个值
    }
  ]
})


export class AppModule { }