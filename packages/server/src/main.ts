import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AppModule } from "./app.module";
import { generateDocument } from "./doc";
import { TransformInterceptor } from "./shared/interceptor/transform.interceptor";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  generateDocument(app);
  const uploadDir =
    process.env.UPLOAD_DIR ?? join(__dirname, "..", "static/upload");

    console.log(123312);
    
  // 静态服务
  app.useStaticAssets(uploadDir, {
    prefix: "/static/upload",
  });
  app.enableCors()
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
