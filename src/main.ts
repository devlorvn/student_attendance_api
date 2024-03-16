import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { TransformInterceptor } from "./common/interceptors/transformSuccessResponse.interceptor";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix(configService.get("API_PREFIX"));
  app.enableCors({ origin: ["http://localhost:3000", "http://localhost:5173"] });
  app.useGlobalInterceptors(new TransformInterceptor());
  const PORT = configService.get("PORT") || 3000;

  const config = new DocumentBuilder().setTitle("Student attendance API").setVersion("1.0").build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("docs", app, document);

  await app.listen(PORT, () => console.log(`Server document is http://localhost:${PORT}/docs`));
}

bootstrap();
