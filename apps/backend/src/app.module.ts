import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { ResilienceModule } from 'nestjs-resilience'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { MainModule } from './modules/main.module'
import { GeoEntity } from './modules/geo/entities/geo.entity'
// import { ThrottlerModule } from '@nestjs/throttler'
// import { DevtoolsModule } from '@nestjs/devtools-integration'

@Module({
  imports: [
    MainModule,
    ResilienceModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || '35.241.202.202',
      port: 5432,
      username: process.env.POSTGRES_USERNAME || 'loop-backend',
      password: process.env.POSTGRES_PASSWORD || 'loop-service-postgres-user-lG#B}-O@<>gv^)Rg',
      database: 'loop-pro-geo',
      entities: [GeoEntity],
      // enable only when writing to a new db to create tables etc
      synchronize: false
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
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
