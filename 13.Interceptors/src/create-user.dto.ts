import { IsString, IsInt } from 'class-validator';

export class CreateUserDto {

  @IsString() // 使用 IsString 装饰器来验证 name 属性是一个字符串
  name: string;

  @IsInt()  // 使用 IsInt 装饰器来验证 age 属性是一个整数
  age: number;
}