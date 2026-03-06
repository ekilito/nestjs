import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'; // FileInterceptor 专门处理文件上传的拦截器
import { Express } from 'express';
import { FileSizeValidationPipe } from './pipes/file-size-validation.pipe';

@Controller('upload')
export class UploadController {
  @Post('file')
  // 使用 FileInterceptor 拦截器处理文件上传 
  // 参数 'file' 指定了前端表单中文件字段的名称 
  // 该拦截器会自动处理 multipart/form-data 格式的请求
  @UseInterceptors(FileInterceptor('file'))
  // UploadedFile ：获取上传文件的参数装饰器
  // 参数类型为 Express.Multer.File，这是 Multer 库的文件类型定义
  // file 参数包含上传文件的详细信息
  // FileSizeValidationPipe ：文件大小验证管道，用于验证上传文件的大小是否超过 1MB
  uploadFile(@UploadedFile(FileSizeValidationPipe) file: Express.Multer.File) {
    console.log(file);
    return { message: 'File uploaded successfully' };
  }
}