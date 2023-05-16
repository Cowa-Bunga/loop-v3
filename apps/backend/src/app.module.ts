import { Module } from '@nestjs/common'
import { OrderModule } from './order/order.module'
import { AuthModule } from './auth/auth.module'
import { RouteModule } from './route/route.module'
import { GeoModule } from './geo/geo.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { ResilienceModule } from 'nestjs-resilience'
import { GeoEntity } from './geo/entities/geo.entity'

@Module({
  imports: [
    OrderModule,
    AuthModule,
    RouteModule,
    GeoModule,
    ResilienceModule,
    TypeOrmModule.forRoot({
      // TODO:
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
