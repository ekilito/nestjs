import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { AppController } from './app.controller';
import { App2Controller } from './app2.controller';
import { AppService } from './app.service';

export function logger1(req: Request, res: Response, next: NextFunction) {
  console.log(`logger1...`);
  next();
};
export function logger2(req: Request, res: Response, next: NextFunction) {
  console.log(`logger2...`);
  next();
};

@Module({
  controllers: [AppController, App2Controller],
  providers: [
    {
      provide: 'PREFIX',
      useValue: 'Hello World!',
    },
    AppService,
  ]
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger1)
      .forRoutes(AppController)

      .apply(logger2)
      .forRoutes(App2Controller)
  }
}