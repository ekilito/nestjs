import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

// 定义一个 ZodValidationPipe 类，实现 PipeTransform 接口
export class ZodValidationPipe implements PipeTransform {
  
  constructor(private schema: ZodSchema) { }   // 构造函数，接受一个 ZodSchema 类型的参数并将其存储在私有属性 schema 中

  // 实现 transform 方法 value 是传入的值，metadata 是参数元数据
  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      // 使用 ZodSchema 进行解析和验证，如果通过则返回解析后的值
      return this.schema.parse(value);
    } catch (error) {
      throw new BadRequestException('Validation failed');
    }
  }
}