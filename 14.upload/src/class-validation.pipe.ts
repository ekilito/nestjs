import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

// 将类标记为可注入的依赖项
@Injectable()
export class ClassValidationPipe implements PipeTransform<any> {

  async transform(value: any, { metatype }: ArgumentMetadata) {
    // 如果没有元数据类型或者不需要验证，则直接返回值
    if (!metatype || !this.toValidate(metatype)) {
      return value; // 此处的value 是一个普通对象
    }

    const object = plainToInstance(metatype, value); // 将普通对象转换为类实例
    const errors = await validate(object);  // 验证对象

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

    return value;
  }

  private toValidate(metatype: Function): boolean {
    // 定义不需要验证的类型数组
    const types: Function[] = [String, Boolean, Number, Array, Object];
    // 如果metatype在types数组中，则不需要验证
    return !types.includes(metatype);
  }
}