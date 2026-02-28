import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController],
  providers: [
    {
      provide: 'PREFIX',
      useValue: 'Hello World!',
    },
    AppService,
  ]
})

export class AppModule { }