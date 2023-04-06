import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { UserModule } from '../user/user.module'
import { User } from '../user/entities/user.entity'
import { DataSource } from 'typeorm'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'loop',
      entities: [User],
      synchronize: process.env.NODE_ENV !== 'production'
    }),
    AuthModule,
    UserModule
  ]
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
