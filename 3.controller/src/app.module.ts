import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerModule } from './logger.module';
import { CoreModule } from './core.module';

@Module({
  controllers: [AppController],
  imports: [CoreModule, LoggerModule],
})

export class AppModule { }