// 导入 Controller 和 Get 装饰器
import { Controller, Get } from '@nestjs/common';
// 使用 @Controller 装饰器标记类为控制器
@Controller('a')
export class AppController {
  // 构造函数，目前没有任何参数和逻辑
  constructor() { }
  // 使用 @Get 装饰器标记方法为处理 GET 请求的路由
  @Get('b')
  // 定义 getHello 方法，返回类型为字符串
  getHello(): string {
    // 返回字符串 'hello'
    return 'hello';
  }
}

/**
 * @Controller 也是一个装饰器，用于定义控制器
 * 控制器是处理传入HTTP请求的核心组件，每个控制器负责处理特定的请求路径和对应的HTTP方法
 * 在控制器的内部会使用路由装饰器 如 @get @post 等来定义路径和请求处理方法
 * 
 * @get 也是一个路由装饰器，用于将控制器的方法（getHello）映射到http 的 get 请求
 * 当客户端使用 GET 方法访问路径 /a/b ['a','b']
 * 通过@get 装饰器，可以指定该方法处理特定路径上的 GET 请求
 */