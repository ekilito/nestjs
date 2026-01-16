import { Controller, Get, Request, Req } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';

// 使用 @Controller 装饰器定义 'users' 路由
@Controller('users')
export class UserController {
  // 使用 @Get 装饰器定义根路径的 GET 请求处理函数
  @Get()
  findAllUsers(): string {
    return 'This action returns all users';
  }

  // 使用 @Get 装饰器定义 '/info' 路径的 GET 请求处理函数
  @Get('info')
  getUserInfo(): string {
    return 'This action returns the info of user';
  }

  // 使用 @Get 装饰器定义 '/req' 路径的 GET 请求处理函数
  @Get('req')
  // 处理请求的函数，使用 @Request 和 @Req 装饰器注入 ExpressRequest 对象
  handleRequest(@Request() request: ExpressRequest, @Req() req: ExpressRequest): string {
    console.log(req.url);
    console.log(req.path);
    console.log(req.method)
    return 'Request handled';
  }
}