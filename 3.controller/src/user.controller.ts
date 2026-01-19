import { Controller, Get, Request, Req, Query, Headers, Session, Ip, Param, Post, Body } from '@nestjs/common';
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

  @Get('query')
  handleQuery(@Query() query: any, @Query('id') id: string): string {
    console.log('query', query);
    console.log('id', id);
    return `Query ID: ${id}`;
  }

  @Get('headers')
  handleHeaders(@Headers('accept') accept: string): string {
    console.log(accept);
    return `Header accept: ${accept}`;
  }

  @Get('session')
  handleSession(@Session() session: any): string {
    if (session.views) {
      session.views++;
    } else {
      session.views = 1;
    }
    return `Number of views: ${session.views}`;
  }

  @Get('ip')
  getUserIp(@Ip() ip: string): string {
    console.log(ip);
    return `IP: ${ip}`;
  }

  @Get('param/:id')
  getParamById(@Param('id') id: string): string {
    console.log('ID:', id);
    return `Param ID: ${id}`;
  }

  @Get('ab*de')
  handleWildcardRoute() {
    return 'This route uses a wildcard';
  }

  @Post('create')
  createUser(@Body() createUserDto, @Body('username') username): string {
    console.log('createUserDto', createUserDto);
    console.log('username', username);
    return 'This action adds a new user';
  }
}