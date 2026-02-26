import { Controller, Get, Inject } from '@nestjs/common';

@Controller()
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