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
  static forRoot(): DynamicModule {
    const providers: any = [
      {
        provide: 'CONFIG',
        useValue: { apiKey: '123' }
      }
    ];
    return {
      module: DynamicConfigModule,
      providers,
      exports: providers.map(provider => (provider instanceof Function ? provider : provider.provide))
    };
  }
}