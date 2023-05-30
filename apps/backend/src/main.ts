import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger'
import { AppModule } from './app.module'
import * as admin from 'firebase-admin'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  })
  app.useGlobalPipes(new ValidationPipe())

  admin.initializeApp()
  admin.firestore().settings({ ignoreUndefinedProperties: true })

  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)

  const config = new DocumentBuilder()
    .setTitle('LOOP')
    .setDescription('OpenAPI spec.')
    .setVersion('3.1')
    .addApiKey({
      type: 'apiKey',
      name: 'x-api-key',
      in: 'header',
    }) 
    .addBearerAuth() 
    .build()

  const document = SwaggerModule.createDocument(app, config)

  const swaggerOptions: SwaggerCustomOptions = {
    customCssUrl: '/assets/swagger.css',
    swaggerOptions: {
      oauth2RedirectUrl: '/api/oauth2-redirect.html', 
    },
    customSiteTitle: 'LOOP API Documentation', 
  }

  SwaggerModule.setup('api', app, document, swaggerOptions)

  const port = process.env.PORT || 3333
  await app.listen(port)
  Logger.log(`🚀 Loop-pro API: http://localhost:${port}/${globalPrefix}`)
}

bootstrap()
