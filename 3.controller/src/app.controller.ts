import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService // 依赖注入
  ) { }

  @Get('config')
  getConfig(): string {
    const config = this.appService.getConfig();
    return `Config Options: ${JSON.stringify(config)}`;
  }
}