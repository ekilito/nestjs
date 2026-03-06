import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  // 实现 PipeTransform 接口的 transform 方法
  transform(value: any, metadata: ArgumentMetadata) {
    // 定义最大文件大小为 1MB
    const maxSize = 1 * 1024 * 1024; // 1MB
    // 如果文件大小超过最大值，则抛出 BadRequestException 异常
    if (value.size > maxSize) {
      throw new BadRequestException('File size is too large');
    }
    // 返回原始文件值
    return value;
  }
}