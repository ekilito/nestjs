import {
  Controller, Get, Request, Req, Query, Headers, Session, Ip, Param, Post, Body, Res, Response,
  Redirect, Next, HttpCode, Header
} from './@nestjs/common';
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { UserDecorator } from './user-decorator';

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
    console.log('url', req.url);
    console.log('path', req.path);
    console.log('method', req.method)
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
  getParamById(@Param() params: any, @Param('id') id: string): string {
    console.log('params:', params);
    console.log('ID:', id);
    return `Param ID: ${id}`;
  }

  @Get('ab*de')
  handleWildcardRoute() {
    return 'This route uses a wildcard';
  }

  @Post('create')
  @HttpCode(200)
  // 向后端发送一个响应头
  @Header('Cache-Control', 'none')
  createUser(@Body() createUserDto, @Body('username') username): string {
    console.log('createUserDto', createUserDto);
    console.log('username', username);
    return 'This action adds a new user';
  }

  @Get('res')
  handleResponse(@Res() res: ExpressResponse, @Response() response: ExpressResponse): void {
    console.log('res', res);
    // console.log('response', response);
    res.send('Custom response');
  }

  /**
   * passthrough : true 表示让 Nest 不负责响应体的发送
   */

  @Get('passthrough')
  passthrough(@Res({ passthrough: true }) res: ExpressResponse): string {
    // 但是有些只想添加个响应头，仅此而已，不想负责响应体的发送
    res.setHeader('Cache-Control-key', 'none');
    // 还是想返回一个值让 Nest 帮我们进行发送响应体操作
    return 'Custom response！！';
  }

  @Get('next')
  next(@Next() next) {
    console.log('next', next);
    // next();
  }

  // 重定向
  @Get('/redirect')
  @Redirect('/users', 301)
  handleRedirect(): void { }

  @Get('redirect2')
  // @Redirect('/users', 302)
  handleRedirect2(@Query('version') version: string) {
    return { url: `https://www.baidu.com/${version}`, statusCode: 301 };
  }

  @Get('customParamDecorator')
  customParamDecorator(@UserDecorator('role') role, @UserDecorator() user) {
    console.log('user', user)
    console.log('role', role)
    return user;
  }
}

/**
 * 在使用 nestjs 的时候，一般来说实体会定义两个类型， 一个是 dto ， 一个是 interface
 * dto：客户端向服务器提交的数据对象，比如说当前用户注册的时候 {用户名 密码} 
 * 然后服务器一般会获取此 dto，保存到数据库中，保存的时候可能还会加入默认值 时间戳，对密码加密，过滤某些字段
 * interface：数据库里保存的数据类型一般会定义一个 interface 定义数据对象的结构
 * 
 * userDto { username: string, password: string }
 * userInterface { id: number, username: string, password: string }
 */