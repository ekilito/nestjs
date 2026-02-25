import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerModule } from './logger.module';
import { CoreModule } from './core.module';
import { CommonModule } from './common.module';
import { OtherModule } from './other.module';

@Module({
  controllers: [AppController],
  imports: [CoreModule, LoggerModule, CommonModule, OtherModule], // CommonModule全局模块（虽然全局了，但通常还是会导入，为了清晰）
})

export class AppModule { }