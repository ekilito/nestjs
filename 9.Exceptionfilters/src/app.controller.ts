import { Controller, Get, HttpException, HttpStatus, BadRequestException, UseFilters } from '@nestjs/common';
import { ForbiddenException } from './forbidden.exception';
// import { CustomExceptionFilter } from './custom-exception.filter'; // 自定义异常过滤器

// @UseFilters() 是NestJS中的一个装饰器，用于应用异常过滤器到特定的作用域。它告诉Nest在指定的范围内使用哪些异常过滤器来处理抛出的异常

@Controller()
// 异步过滤器可以设置为控制器级别的，针对控制器里所有的方法生效
// @UseFilters(new CustomExceptionFilter())
export class AppController {
  @Get('exception')
  exception() {
    // 当异常是未识别的（既不是 HttpException 也不是继承自 HttpException 的类）
    // throw new Error('未识别');
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

  @Get('custom')
  custom() {
    throw new ForbiddenException();
  }

  // 内置异常
  @Get('bad-request')
  badRequest() {
    throw new BadRequestException('Something bad happened', 'Some error description');
    // {"message":"Something bad happened","error":"Some error description","statusCode":400}
  }

  @Get('useFilters')
  // 异步过滤器可以设置为路由方法级别的，针对特定的方法生效 只对单个路由方法生效
  // @UseFilters(new CustomExceptionFilter()) // 只对这个方法生效
  async UseFilters() {
    throw new ForbiddenException();
  }
}