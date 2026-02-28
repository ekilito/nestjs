import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { APP_FILTER } from '@nestjs/core'; // 导入APP_FILTER令牌(token)，这是一个特殊的注入令牌
import { CustomExceptionFilter } from './custom-exception.filter'; // 引入自定义异常过滤器

@Module({
  controllers: [AppController],
  providers: [
    {
      provide: 'PREFIX', // 提供一个字符串令牌，表示前缀
      useValue: 'Hello World!', // 指定要注入的值
    },
    {
      provide: APP_FILTER, // 使用特殊的APP_FILTER令牌
      useClass: CustomExceptionFilter,  // 指定要使用的过滤器类
    }
  ],
  // 这段代码的作用是在模块级别注册全局异常过滤器，相当于在main.ts中写：
  // main: 无法使用依赖注入 过滤器不能注入其他服务 注册在应用启动时
  // 模块中注册: 可以使用依赖注入！过滤器可以注入其他服务 注册在模块加载时
})

export class AppModule { }