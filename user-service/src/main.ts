import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { env } from 'shared/consts/env'
import { GlobalExceptionFilterMiddleware } from 'shared/middlewares/request-response.middleware'

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new GlobalExceptionFilterMiddleware())
  app.enableShutdownHooks()
  await app.listen(env.PORT)
  console.table({
    URL: `http://0.0.0.0:${env.PORT}`
  })
}
void bootstrap()
