import { Get, Controller, UseInterceptors } from "@nestjs/common";
import { Logging1Interceptor } from "./logging1.interceptor";
import { Logging2Interceptor } from "./logging2.interceptor";
import { Logging3Interceptor } from "./logger3.interceptor";
import { Logging4Interceptor } from "./logger4.interceptor";

@Controller('pay')
@UseInterceptors(Logging3Interceptor)
@UseInterceptors(Logging4Interceptor)
export class PayController {
  @Get()
  @UseInterceptors(Logging1Interceptor)
  @UseInterceptors(Logging2Interceptor)
  async pay() {
    console.log('pay...');
    return 'pay'
  }

  @Get('null')
  async null() {
    console.log('null...');
    return null;
    // return {}
  }
}