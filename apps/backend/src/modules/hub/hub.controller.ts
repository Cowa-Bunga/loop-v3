import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { HubService } from './hub.service'
import { ApiPostRequest } from '../../shared/decorators/api.decorator'
import { CreateHubDto } from './dtos/hub.dto'
import { Client } from '../../shared/decorators/client.decorator'
import { User } from '../../shared/decorators/user.decorator'
import { ClientRequest, UserRequest } from '../../shared/entities/request.entity'
import { Hub } from './entities/hub.entity'

@Controller('hub')
export class HubController {
  constructor(private readonly hubService: HubService) {}

  @ApiPostRequest('Hub', CreateHubDto)
  @Post()
  async createHub(
    @Body() createHubDto: CreateHubDto,
    @Client() client: ClientRequest,
    @User() user: UserRequest
  ): Promise<Hub> {
    // Check if a hub with that name already exists
    const hubExists = await this.hubService.checkHubExists(client, createHubDto.name)
    if (hubExists) {
      throw new BadRequestException('Hub with that name already exists.')
    }

    const hub = await this.hubService.createHub(createHubDto, client, user)

    return new Hub(hub)
  }
}
