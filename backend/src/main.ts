import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend
  const allowedOrigins = [
    'http://localhost:3000',
    'https://viva-femini-lemon.vercel.app',
    '*',
    ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
  ];

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('VivaFemini API')
    .setDescription('API documentation for VivaFemini - Cycle Tracking Application')
    .setVersion('1.0')
    .addTag('cycles', 'Cycle tracking endpoints')
    .addTag('daily-logs', 'Daily log entries')
    .addTag('symptoms', 'Symptom tracking')
    .addTag('articles', 'Health articles')
    .addTag('health-reports', 'Health report data')
    .addTag('seed', 'Data seeding endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger documentation available at: http://localhost:${port}/api/docs`);
}

bootstrap();
