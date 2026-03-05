import { NestFactory } from "@nestjs/core";
import { AppModule } from './app.module';

import { TransformInterceptor } from './transform.interceptor';
import { ExcludeNullInterceptor } from './excludeNull.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalInterceptors(new ExcludeNullInterceptor());
    await app.listen(3000);
}
bootstrap();