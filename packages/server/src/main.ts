import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AppModule } from "./app.module";
import { generateDocument } from "./doc";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  generateDocument(app);
  const uploadDir =
    process.env.UPLOAD_DIR ?? join(__dirname, "..", "static/upload");

  // 静态服务
  app.useStaticAssets(uploadDir, {
    prefix: "/static/upload",
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
