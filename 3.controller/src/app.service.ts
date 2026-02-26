import { Inject, Injectable } from '@nestjs/common';
import { Config } from './dynamicConfig.module';

@Injectable()
export class AppService {
  constructor(
    @Inject('PREFIX') private readonly prefix: string,
    @Inject('CONFIG') private readonly config: Config, // 依赖注入
  ) { }

  getConfig() {
    return this.config.apiKey + this.prefix;
  }
}