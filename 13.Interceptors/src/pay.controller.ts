import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { Logging1Interceptor } from './logging1.interceptor';
import { Logging2Interceptor } from './logging2.interceptor';

@Controller('pay')
@UseInterceptors(Logging1Interceptor) // 第一个拦截器
@UseInterceptors(Logging2Interceptor) // 第二个拦截器
export class PayController {
  @Get()
  async pay() {
    console.log('pay...');
    return 'pay';
  }
}
/**
  Before2...
  Before1...
  pay...
  After1... 3ms
  After2... 9ms
 */