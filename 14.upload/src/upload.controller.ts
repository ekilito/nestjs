import { Controller, Post, UseInterceptors, UploadedFile, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'image/png' }),
        ],
      }),
    )
    file: Express.Multer.File) {
    console.log(file);
    return { message: 'fileValidator' };
  }

  @Post('files')
  // 上传多个文件的路由处理方法
  // 第一个参数 'files'：前端表单中文件字段的名称 
  // 第二个参数 10：限制上传的文件数量最多为 10 个
  @UseInterceptors(FilesInterceptor('files', 10))
  // files: Array<Express.Multer.File>：参数类型是 Multer.File 对象的数组
  files(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log('files', files);
    return { message: 'Files uploaded successfully' };
  }
}