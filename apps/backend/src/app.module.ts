import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { ResilienceModule } from 'nestjs-resilience'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { MainModule } from './modules/main.module'
import { GeoEntity } from './modules/geo/entities/geo.entity'

@Module({
  imports: [
    MainModule,
    ResilienceModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true
    }),
    TypeOrmModule.forRoot({
      // TODO: move to envs
      type: 'postgres',
      host: '35.241.202.202',
      // port: 5432,
      username: 'loop-backend',
      password: 'loop-service-postgres-user-lG#B}-O@<>gv^)Rg',
      database: 'loop-pro-geo',
      entities: [GeoEntity]
      // synchronize: process.env.NODE_ENV !== 'production'
    })
  ]
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
