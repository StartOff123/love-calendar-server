import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as session from 'express-session'
import * as passport from 'passport'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(
    session({
      secret: 'keyword',
      resave: false,
      saveUninitialized: false
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  app.enableCors({
    credentials: true,
    origin: ['https://love-calendar-beige.vercel.app']
  })
  await app.listen(3001)
}
bootstrap()
