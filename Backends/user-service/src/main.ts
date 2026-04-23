import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { env } from 'shared/consts/env'
import { GlobalExceptionFilterMiddleware } from 'shared/middlewares/request-response.middleware'
import cookieParser from 'cookie-parser'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new GlobalExceptionFilterMiddleware())
  app.enableShutdownHooks()
  app.use(cookieParser())

  const config = new DocumentBuilder()
    .setTitle('Task Manager API — User Service')
    .setDescription('Documentación completa del servicio de usuarios')
    .setVersion('1.0')
    .addCookieAuth('access_token') // 👈 porque usás cookies
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)
  await app.listen(env.PORT)
  console.table({
    URL: `http://0.0.0.0:${env.PORT}`
  })
}
void bootstrap()
