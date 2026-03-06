import { Controller, Get, Post, UseInterceptors, UploadedFile, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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
}