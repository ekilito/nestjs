import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {

  async transform(value: any, { metatype }: ArgumentMetadata) {
    // 如果没有元类型或者元类型不需要验证，则直接返回值
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException(this.formatErrors(errors));
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: ValidationError[]) {
    // 将每个错误信息格式化为字符串，并用逗号分隔
    return errors
      .map(err => {
        for (const property in err.constraints) {
          return `${err.property} - ${err.constraints[property]}`;
        }
      })
      .join(', ');
  }
}
