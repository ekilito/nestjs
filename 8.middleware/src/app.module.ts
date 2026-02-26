import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DynamicConfigModule } from './dynamicConfig.module';
import { AppService } from './app.service';

@Module({
  imports: [
    DynamicConfigModule.forRoot('456')  // 动态模块
  ],
  controllers: [AppController], // 注册控制器
  providers: [AppService], // 注册服务提供者
  exports: [AppService] // 导出服务提供者
})

export class AppModule { }