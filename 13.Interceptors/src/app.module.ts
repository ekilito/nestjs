import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from "@nestjs/common";
import { AppController } from './app.controller';
import { APP_PIPE } from '@nestjs/core'; // 导入 APP_PIPE 常量
import { AccountController } from './account.controller';
import { AuthMiddleware } from './auth.middleware';

@Module({
  controllers: [AppController, AccountController],
  providers: [
    // 注册全局验证管道 依赖注入
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(AccountController);
  }
}
