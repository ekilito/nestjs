import { Inject, Injectable } from '@nestjs/common';


@Injectable()
export class AppService {
  constructor(
    @Inject('PREFIX') private readonly prefix: string, // 注入前缀

  ) { }

  getPrefix() {
    return this.prefix;
  }
}