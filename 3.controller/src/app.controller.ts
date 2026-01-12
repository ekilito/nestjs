import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  // 使用 Get 装饰器标记 index 方法为 HTTP GET 路由处理程序
  @Get()
  index() {
    return 'Hello'
  }
}