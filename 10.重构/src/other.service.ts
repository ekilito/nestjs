import { Injectable } from "@nestjs/common"
import { CommonService } from './common.service'

@Injectable()
export class OtherService {
  constructor(
    private readonly commonService: CommonService // 注入 CommonService
  ) { }
  log(message) {
    this.commonService.log(message); // 调用 CommonService 的方法
  }
}