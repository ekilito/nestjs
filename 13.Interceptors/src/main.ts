import { NestFactory } from "@nestjs/core";
import { AppModule } from './app.module';

import { TransformInterceptor } from './transform.interceptor';
import { ExcludeNullInterceptor } from './excludeNull.interceptor';
import { ErrorsInterceptor } from './errors.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalInterceptors(new ExcludeNullInterceptor());
    app.useGlobalInterceptors(new ErrorsInterceptor());
    await app.listen(3000);
}
bootstrap();