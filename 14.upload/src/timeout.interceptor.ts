import { Injectable, NestInterceptor, ExecutionContext, RequestTimeoutException } from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next): Observable<any> {
    return next.handle().pipe(
      timeout(1000), // 设置超时时间为 1000ms (1秒)
      catchError(err => {
        if (err instanceof TimeoutError) {
          // 如果是超时错误，转换为 408 Request Timeout
          return throwError(() => new RequestTimeoutException());
        } else {
          // 其他错误原样抛出
          return throwError(() => err);
        }
      }),
    );
  }
}