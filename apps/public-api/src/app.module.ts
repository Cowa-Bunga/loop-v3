import { Module } from '@nestjs/common'
import { ResilienceModule } from 'nestjs-resilience'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { MainModule } from './modules/main.module'
// import { ThrottlerModule } from '@nestjs/throttler'
// import { DevtoolsModule } from '@nestjs/devtools-integration'

@Module({
  imports: [
    MainModule,
    ResilienceModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true
    })
    // ThrottlerModule.forRoot({
    //   ttl: 60,
    //   limit: 10
    // }),
    // DevtoolsModule.register({
    //   http: process.env.NODE_ENV !== 'production'
    // })
  ]
})
export class AppModule {}
