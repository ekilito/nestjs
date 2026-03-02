import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'

@Controller('app')
export class AppController {
  @Get('number/:id')
  // @Param('id', ParseIntPipe)
  // 获取路由参数：'id' 指定从路由中获取名为 id 的参数
  // 转换和验证：ParseIntPipe 是 NestJS 内置管道，将字符串参数转换为整数
  getNumber(@Param('id', ParseIntPipe) id: number): string {
    return `The number is ${id}`;
  }
}