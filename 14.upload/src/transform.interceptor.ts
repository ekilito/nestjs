import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export interface Response<T> {
  data: T;
}
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next): Observable<Response<T>> {
    return next.handle().pipe(map(data => {
      console.log('TransformInterceptor', data);
      return ({ data });
    }));
  }
}

// 使用 map 操作符转换响应数据
// 将原始数据包装成 { data: 原始数据 } 格式
// {"data":""}
// {"data": {}}