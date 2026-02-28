import { Module, DynamicModule } from '@nestjs/common';

export interface Config {
  apiKey: string;
}

@Module({
  providers: [
    {
      provide: 'PREFIX',
      useValue: 'Hello World'
    }
  ],
  exports: ['PREFIX']
})
export class DynamicConfigModule {
  static forRoot(apiKey: string): DynamicModule | Promise<DynamicModule> {
    // 根据参数动态创建提供者
    const providers: any = [
      {
        provide: 'CONFIG',
        useValue: { apiKey }
      }
    ];
    // 支持异步创建提供者！
    const controllers = [];
    // return new Promise<DynamicModule>(resolve => {
    //   setTimeout(() => {
    //     resolve({
    //       module: DynamicConfigModule, // 动态模块
    //       providers, // 提供者
    //       controllers, // 控制器
    //       exports: providers.map(provider => (provider instanceof Function ? provider : provider.provide)) // 导出提供者
    //     });
    //   }, 1000);
    // });
    return {
      module: DynamicConfigModule, // 动态模块
      providers, // 提供者
      exports: providers.map(provider => (provider instanceof Function ? provider : provider.provide)) // 导出提供者
    };
  }
}