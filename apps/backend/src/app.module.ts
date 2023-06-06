import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { ResilienceModule } from 'nestjs-resilience'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { MainModule } from './modules/main.module'
import { GeoEntity } from './modules/geostore/entities/geo.entity'
import { TrackingEntity } from './modules/tracking/entities/tracking.entity'
// import { ThrottlerModule } from '@nestjs/throttler'
import { DevtoolsModule } from '@nestjs/devtools-integration'

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
      host: process.env.DATASOURCE_POSTGRES_HOST,
      port: Number(process.env.DATASOURCE_POSTGRES_PORT),
      username: process.env.DATASOURCE_POSTGRES_USERNAME,
      password: process.env.DATASOURCE_POSTGRES_PASSWORD,
      database: process.env.DATASOURCE_POSTGRES_GEO_DB,
      entities: [GeoEntity, TrackingEntity],
      // enable only when writing to a new db to create tables etc
      synchronize: true
    }),
    // ThrottlerModule.forRoot({
    //   ttl: 60,
    //   limit: 10
    // }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production'
    })
  ]
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
