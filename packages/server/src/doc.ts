import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as packageConfig from "../package.json";

export const generateDocument = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle(packageConfig.name)
    .setDescription(packageConfig.description)
    .setVersion(packageConfig.version)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, // 允许token 验证
      'JWT',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("/", app, document);
};