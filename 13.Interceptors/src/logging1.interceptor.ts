import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable() // 装饰器：使这个类可以被 NestJS 的 DI 容器管理
export class Logging1Interceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 在请求处理之前执行的逻辑
    console.log('Before1...');
    const now = Date.now();
    return next
      .handle() // return next.handle()  // 调用下一个拦截器或控制器方法 如果有其他拦截器，继续执行它们的逻辑 返回 Observable
      .pipe( // pipe() 方法用于将多个 RxJS 操作符组合起来 可以对数据流进行转换、处理
        tap( // tap：	RxJS 操作符，用于执行副作用操作（如日志）而不修改数据流
          // 在请求处理之后执行的逻辑
          () => console.log(`After1... ${Date.now() - now}ms`)
        )
      );
  }
}

// NestInterceptor：拦截器接口，要求实现 intercept() 方法
// ExecutionContext：执行上下文，提供当前请求/执行的详细信息
// CallHandler：调用处理器，用于执行控制器方法
// Observable：RxJS 的观察者对象，处理异步数据流
// tap：	RxJS 操作符，用于执行副作用操作（如日志）而不修改数据流