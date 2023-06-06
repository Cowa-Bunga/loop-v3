import { Module } from '@nestjs/common'
import { RouteModule } from './route/route.module'
import { GeoModule } from './geostore/geo.module'
import { QueryModule } from './bigquery/query.module'
import { FormsModule } from './forms/forms.module'
import { TrackingModule } from './tracking/tracking.module'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from '../shared/guards/auth.guard'

@Module({
  imports: [RouteModule, QueryModule, GeoModule, FormsModule, TrackingModule],

  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class MainModule {}
