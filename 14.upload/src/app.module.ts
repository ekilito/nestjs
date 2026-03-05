import { Module } from "@nestjs/common";
import { PayController } from './pay.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Logging6Interceptor } from "./logger6.interceptor";
import { Logging5Interceptor } from "./logger5.interceptor";
@Module({
  controllers: [PayController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: Logging6Interceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: Logging5Interceptor,
    }
  ]
})
export class AppModule { }