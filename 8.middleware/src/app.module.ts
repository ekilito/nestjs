import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'; // 导入模块装饰器
import { AppController } from './app.controller';
import { DynamicConfigModule } from './dynamicConfig.module';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger.middleware'; // 导入中间件
import { logger } from './logger.function.middleware'; // 导入函数中间件

@Module({
  imports: [
    DynamicConfigModule.forRoot('456')
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService]
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 配置中间件 要针对/config 的路径应用 LoggerMiddleware中间件
    consumer
      // .apply(LoggerMiddleware)
      .apply(logger)  // 应用函数中间件 ~
      // .forRoutes('config');
      // .forRoutes('ab*de'); // 路由通配符 匹配所有以ab开头de结尾的路由
      //.forRoutes({ path: 'config', method: RequestMethod.GET })
      .exclude({ path: '/app/config', method: RequestMethod.GET },) // 排除对/config路径的GET请求
      .forRoutes(AppController); // 匹配所有AppController控制器中的路由
  }
}