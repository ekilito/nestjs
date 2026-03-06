import { Controller, Post, UseInterceptors, UploadedFile, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { FileSizeValidationPipe } from './pipes/file-size-validation.pipe';

@Controller('upload')
export class UploadController {
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile(FileSizeValidationPipe) file: Express.Multer.File) {
    console.log(file);
    return { message: 'File uploaded successfully' };
  }

  @Post('file-validator')
  @UseInterceptors(FileInterceptor('file'))
  fileValidator(
    // 上传文件的参数装饰器
    // 第一个参数是 ParseFilePipe 实例，用于验证上传文件的大小和类型
    // 第二个参数是文件字段的名称，这里是 'file'
    @UploadedFile(
      // ParseFilePipe 是一个文件验证管道，它会在文件被接收后、进入控制器方法前进行验证。如果验证失败，会自动返回相应的错误响应。
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 }), // 限制上传文件的最大大小
          new FileTypeValidator({ fileType: 'image/png' }), // 限制上传文件的 MIME 类型
        ],
      }),
    )
    file: Express.Multer.File) {
    console.log(file);
    return { message: 'fileValidator' };
  }

}