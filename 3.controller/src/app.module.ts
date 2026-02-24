import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './user.controller';
import { LoggerService } from './logger.service';

@Module({
  controllers: [AppController, UserController],
  providers: [
    LoggerService
  ]
})


export class AppModule { }