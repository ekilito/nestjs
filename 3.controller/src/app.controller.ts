import { Controller, Get, Inject } from '@nestjs/common';
import { LoggerService, UseValueService, UseFactory, LoggerClassService } from './logger.service'

@Controller()
export class AppController {
  constructor(
    private loggerClassService: LoggerClassService,
    private loggerService: LoggerService,
    @Inject('StringToken') private useValueService: UseValueService,
    @Inject('FactoryToken') private useFactory: UseFactory,
  ) { }
  // 使用 Get 装饰器标记 index 方法为 HTTP GET 路由处理程序
  @Get()
  index() {
    this.loggerClassService.log('index');
    this.loggerService.log('index');
    this.useValueService.log('index');
    this.useFactory.log('index');
    return 'Hello'
  }
}