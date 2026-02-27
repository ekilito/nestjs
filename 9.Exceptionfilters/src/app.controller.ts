import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('exception')
  exception() {
    // 当异常是未识别的（既不是 HttpException 也不是继承自 HttpException 的类）
    // throw new Error('exception');
    // {"statusCode":500,"message":"Internal server error"}

    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN); 
    // {"statusCode":403,"message":"Forbidden"}

    // 自定义异常
    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'This is a custom message',
    }, HttpStatus.FORBIDDEN);
  }
  // {"status":403,"error":"This is a custom message"}
}