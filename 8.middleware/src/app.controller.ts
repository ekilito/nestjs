import { Controller, Get, Inject } from '@nestjs/common';

@Controller('app') // 路由前缀
export class AppController {
  @Get('config')
  getConfig(): string {
    return `Config`;
  }

  @Get('abcde')
  abcde(): string {
    return `abcde`;
  }
}