// 从 '@nestjs/common' 模块中导入 Module 装饰器
import { Module } from '@nestjs/common';
// 从当前目录导入 AppController 控制器
import { AppController } from './app.controller';
// 使用 @Module 装饰器定义一个模块
@Module({
  // 在 controllers 属性中指定当前模块包含的控制器
  controllers: [AppController],
})
// 定义并导出 AppModule 模块
export class AppModule { }