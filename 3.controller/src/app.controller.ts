import { Controller, Get, Inject } from '@nestjs/common';
import { LoggerService, UseValueService, UseFactory, LoggerClassService } from './logger.service'
import { CommonService } from './common.service'
import { OtherService } from './other.service'

@Controller()
export class AppController {
  constructor(

    // 类 token - 直接注入
    private loggerClassService: LoggerClassService, // 类型自动匹配
    private loggerService: LoggerService, // 类型自动匹配

    private readonly commonService: CommonService,  // 注入 CommonService
    private readonly otherService: OtherService,

    // 字符串 token - 需要 @Inject
    @Inject('StringToken') private useValueService: UseValueService,
    @Inject('FactoryToken') private useFactory: UseFactory,
  ) { }
  // 使用 Get 装饰器标记 index 方法为 HTTP GET 路由处理程序
  @Get()
  index() {
    this.loggerClassService.log('index');
    this.loggerService.log('index');
    this.useValueService.log('index');
    this.useFactory.log('index');
    return 'Hello'
  }

  @Get('common')
  common(): string {
    this.commonService.log('Hello from CommonService');  // 使用服务
    return 'common';
  }

  @Get('other')
  other(): string {
    this.otherService.log('Hello from otherService');
    return 'other';
  }
}

// 这种设计让 NestJS 的依赖注入非常灵活，可以根据不同场景选择合适的注册方式。