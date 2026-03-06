import { Controller, Get, Post, UseInterceptors, UploadedFile, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor, FileFieldsInterceptor, AnyFilesInterceptor, NoFilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { FileSizeValidationPipe } from './pipes/file-size-validation.pipe';
@Controller('upload')
export class UploadController {
  @Get()
  index() {
    return { message: 'hello' }
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile(FileSizeValidationPipe) file: Express.Multer.File) {
    console.log(file);
    return { message: 'File uploaded successfully' };
  }
  @Post('file-validator')
  @UseInterceptors(FileInterceptor('file'))
  fileValidator(@UploadedFile(
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
  @UseInterceptors(FilesInterceptor('files', 10))
  files(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    return { message: 'Files uploaded successfully' };
  }

  // 多字段文件上传接口，允许同时上传不同类型的文件 
  @Post('fileFields')
  // FileFieldsInterceptor 的特点：
  // 参数是一个配置数组，每个配置对象包含：name: 前端表单中的字段名， maxCount: 该字段允许上传的最大文件数量
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatar', maxCount: 1 },
    { name: 'background', maxCount: 1 },
  ]))

  // @UploadedFiles(): 获取所有上传的文件 
  // 该方法返回一个对象，对象的每个属性对应前端表单中的一个字段名，属性值是一个文件数组
  fileFields(@UploadedFiles() files: {
    avatar?: Express.Multer.File[], // 头像文件数组（因为 maxCount=1，所以数组长度最多为 1）
    background?: Express.Multer.File[] // 背景文件数组（因为 maxCount=1，所以数组长度最多为 1）
  }) {
    console.log(files);
    return { message: 'successfully' };
  }

  @Post('anyFiles')
  // AnyFilesInterceptor: 允许上传任意类型的文件，不限制文件数量和类型 允许上传任意数量、任意字段名的文件
  @UseInterceptors(AnyFilesInterceptor())
  anyFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    return { message: 'successfully' };
  }

  @Post('no-files')
  // NoFilesInterceptor: 用于验证是否没有上传任何文件
  @UseInterceptors(NoFilesInterceptor)
  noFiles() {
    return { message: 'No files uploaded' };
  }
}