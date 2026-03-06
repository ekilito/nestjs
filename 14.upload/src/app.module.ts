import { Module } from "@nestjs/common";
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express'; // Multer 文件上传模块

@Module({
  imports: [
    MulterModule.register({ // 注册 Multer 模块的全局配置
      dest: './upload', // 设置文件上传的默认存储目录为项目根目录下的 upload 文件夹
    }),
  ],
  controllers: [UploadController]
})
export class AppModule { }
