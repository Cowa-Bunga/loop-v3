import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import * as admin from 'firebase-admin'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  })

  admin.initializeApp()
  admin.firestore().settings({ ignoreUndefinedProperties: true })

  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)

  const config = new DocumentBuilder()
    .setTitle('LOOP')
    .setDescription('OpenAPI spec.')
    .setVersion('3.1')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const port = process.env.PORT || 3333
  await app.listen(port)
  Logger.log(`🚀 Loop-pro API: http://localhost:${port}/${globalPrefix}`)
}

bootstrap()
