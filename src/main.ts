import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ativando CORS para permitir requisições de outros domínios
  app.enableCors();

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Estacionamento')
    .setDescription('Documentação da API para gerenciamento de estacionamentos, com autenticação e autorização JWT.')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Insira o token JWT para acessar as rotas protegidas',
    })
    .build();

  // Criação do documento Swagger
  const document = SwaggerModule.createDocument(app, config);

  // Configuração da rota da documentação (http://localhost:3000/api-docs)
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
