import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Inject } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException) // 指定这个过滤器只捕获HttpException类型的异常！
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(@Inject('PREFIX') private readonly prefix: string) { // 通过构造函数注入前缀

  }
  catch(exception: HttpException, host: ArgumentsHost) { // exception：被捕获的异常对象，类型为HttpException host：ArgumentsHost对象，提供访问请求上下文的方法
    console.log('prefix:', this.prefix)
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>(); // 获取响应对象
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    response
      .status(status)
      .json({ // 返回JSON响应
        statusCode: status,
        timestamp: new Date().toISOString(), // 异常发生的时间戳
        path: request.url, // 请求的URL路径
      });
    // {"statusCode":403,"timestamp":"2026-02-28T03:30:00.650Z","path":"/useFilters"}
  }
}

// ExceptionFilter：NestJS提供的异常过滤器接口，所有自定义过滤器必须实现这个接口
// Catch：装饰器，告诉Nest这个过滤器要捕获什么类型的异常
// ArgumentsHost：提供访问传递给原始处理程序的参数的方法（请求、响应等）
// HttpException：NestJS内置的HTTP异常基类，所有HTTP相关的异常都继承自它