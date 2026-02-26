import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'; // 导入模块装饰器
import { AppController } from './app.controller';
import { DynamicConfigModule } from './dynamicConfig.module';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger.middleware'; // 导入中间件

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
      .apply(LoggerMiddleware)
      .forRoutes('config');
    //.forRoutes({ path: 'config', method: RequestMethod.GET })
  }
}