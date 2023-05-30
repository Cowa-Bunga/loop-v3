import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { Client } from '../../shared/decorators/client.decorator'
import { User } from '../../shared/decorators/user.decorator'
import { ClientRequest, UserRequest } from '../../shared/entities/request.entity'
import { DashboardService } from './dashboard.service'

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @ApiBearerAuth()
  async get(@Client() client: ClientRequest, @User() user: UserRequest) {
    return this.dashboardService.getAll(client, user)
  }
}
