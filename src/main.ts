import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    credentials: true,
    origin: [
      'https://love-calendar-beige.vercel.app',
      'https://love-calendar.onrender.com',
      'http://localhost:3000'
    ]
  })
  await app.listen(3001)
}
bootstrap()
