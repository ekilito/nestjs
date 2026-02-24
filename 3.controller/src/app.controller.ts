import { Controller, Get, Inject } from '@nestjs/common';
import { LoggerService, UseValueService } from './logger.service'

@Controller()
export class AppController {
  constructor(
    private loggerService: LoggerService,
    @Inject('StringToken') private useValueService: UseValueService,
  ) { }
  // 使用 Get 装饰器标记 index 方法为 HTTP GET 路由处理程序
  @Get()
  index() {
    this.loggerService.log('index');
    this.useValueService.log('index');
    return 'Hello'
  }
}