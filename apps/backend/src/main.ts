import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger'
import { AppModule } from './app.module'
import * as admin from 'firebase-admin'
import { LoggingInterceptor } from './shared/interceptors/logging.intercept'

async function bootstrap() {
  // APP setup
  const app = await NestFactory.create(AppModule, {
    cors: false
  })

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new LoggingInterceptor())

  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)

  // FIRESTORE
  // TODO: check https://www.npmjs.com/package/@lontara/nestjs-firebase-admin
  admin.initializeApp()
  admin.firestore().settings({ ignoreUndefinedProperties: true })

  // OPENAPI / Swagger
  SwaggerModule.setup(
    'api',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('LOOP')
        .setDescription('OpenAPI internal spec.')
        .setVersion('3.1')
        // .addApiKey({
        //   type: 'apiKey',
        //   name: 'x-api-key',
        //   in: 'header'
        // })
        // .addBearerAuth()
        .build()
    ),
    {
      swaggerOptions: {
        oauth2RedirectUrl: '/api/oauth2-redirect.html'
      },
      customSiteTitle: 'LOOP internal API Documentation'
    } as SwaggerCustomOptions
  )

  const port = process.env.PORT || 3001
  await app.listen(port)
  Logger.log(`🚀 Loop-pro: http://localhost:${port}/${globalPrefix}`)
}

bootstrap()
