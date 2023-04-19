import { Module } from '@nestjs/common'
import { OrderModule } from './order/order.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [OrderModule, AuthModule]
})
export class AppModule {}
