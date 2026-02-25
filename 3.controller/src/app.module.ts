import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerModule } from './logger.module';

@Module({
  controllers: [AppController],
  imports: [LoggerModule],
})

export class AppModule { }