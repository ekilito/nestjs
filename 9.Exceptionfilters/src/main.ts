import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({
    secret: 'your_secret_key', // 用于加密会话的密钥
    resave: false, // 在每次请求结束后是否强制保存会话，即使它没有改变
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie: {
      maxAge: 24 * 60 * 60 * 1000 // 会话的过期时间，单位毫秒
    }
  }))
  await app.listen(3000);
}
bootstrap();
