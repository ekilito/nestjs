import { Module, ValidationPipe } from "@nestjs/common";
import { AppController } from './app.controller';
import { APP_PIPE } from '@nestjs/core'; // 导入 APP_PIPE 常量

@Module({
  controllers: [AppController],
  providers: [
    // 注册全局验证管道 依赖注入
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule { }