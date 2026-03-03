import {
  Controller, Get, Param, Query, Body, UsePipes, Post,
  ParseIntPipe, // 将字符串参数转换为整数
  ParseFloatPipe, // 将字符串参数转换为浮点数
  ParseBoolPipe, // 将字符串参数转换为布尔值
  ParseArrayPipe, // 将字符串参数转换为数组
  ParseUUIDPipe, // 解析字符串参数并验证它是否为 UUID 
  ParseEnumPipe, // 将字符串参数转换为枚举值
  DefaultValuePipe, // 将查询参数转换为默认值
} from '@nestjs/common'

import { CustomPipe } from './custom.pipe';
import { CreateCatDto, createCatSchema } from './create-cat.dto';
import { ZodValidationPipe } from './zod-validation.pipe';
import { CreateUserDto } from './create-user.dto';
import { ClassValidationPipe } from './class-validation.pipe';

enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

@Controller('app')
export class AppController {
  @Get('number/:id')
  getNumber(@Param('id', ParseIntPipe) id: number): string {
    return `The number is ${id}`;
  }

  @Get('float/:value')
  getFloat(@Param('value', ParseFloatPipe) value: number): string {
    return `The float value is ${value}`;
  }

  @Get('bool/:flag')
  getBool(@Param('flag', ParseBoolPipe) flag: boolean): string {
    return `The boolean value is ${flag}`;
  }

  @Get('array/:values')
  // new ParseArrayPipe({ items: String, separator: ',' }) separator: 是分隔符 items: 是数组元素类型
  getArray(@Param('values', new ParseArrayPipe({ items: String, separator: ',' })) values: string[]): string {
    console.log(values); // [ '1', '2', 'a' ]
    return `The array values are ${values.join(', ')}`;
  }

  @Get('uuid/:id')
  getUuid(@Param('id', ParseUUIDPipe) id: string): string {
    return `The UUID is ${id}`;
  }

  @Get('role/:role')
  getRole(@Param('role', new ParseEnumPipe(UserRole)) role: UserRole): string {
    return `The role is ${role}`;
  }

  @Get('default')
  getDefault(@Query('name', new DefaultValuePipe('Guest')) name: string): string {
    return `Hello, ${name}`;
  }

  @Get('custom/:value')
  getCustom(@Param('value', CustomPipe) value: any): string {
    return `The custom value is ${value}`;
  }

  @Post('cats')
  //应用 ZodValidationPipe 管道，使用 createCatSchema 进行数据验证
  @UsePipes(new ZodValidationPipe(createCatSchema))
  async createCat(@Body() createCatDto: CreateCatDto): Promise<string> {
    console.log('Create Cat DTO:', createCatDto);
    return 'This action adds a new cat';
  }

  @Post('user/create')
  async userCreate(@Body(new ClassValidationPipe()) createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    return 'This action adds a new user';
  }
}