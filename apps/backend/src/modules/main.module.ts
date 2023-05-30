import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { RouteModule } from './route/route.module'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from '../shared/guards/auth.guard'

@Module({
  imports: [AuthModule, RouteModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class MainModule {}
