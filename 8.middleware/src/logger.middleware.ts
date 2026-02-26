import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
// 从express导入类型定义 Request: HTTP请求对象类型 Response: HTTP响应对象类型  NextFunction: 下一个中间件函数类型

@Injectable() // 装饰器，使这个类可以被注入到NestJS的依赖注入容器中
export class LoggerMiddleware implements NestMiddleware {
  // 实现NestMiddleware接口必须的use方法
  use(req: Request, res: Response, next: NextFunction) {
    console.log('LoggerMiddleware');
    // 调用next()将控制权传递给下一个中间件或路由处理器
    next();
  }
}