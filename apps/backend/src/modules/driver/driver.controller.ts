import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { DriverService } from './driver.service'
import { ApiPostRequest } from '../../shared/decorators/api.decorator'
import { Client } from '../../shared/decorators/client.decorator'
import { User } from '../../shared/decorators/user.decorator'
import { ClientRequest, UserRequest } from '../../shared/entities/request.entity'
import { CreateDriverDto } from './dtos/driver.dto'
import { Driver } from './entities/driver.entity'

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @ApiPostRequest('Driver', CreateDriverDto)
  @Post()
  async createDriver(
    @Body() createDriverDto: CreateDriverDto,
    @Client() client: ClientRequest,
    @User() user: UserRequest
  ) {
    // Check if a driver with that email already exists
    const driverExists = await this.driverService.checkDriverExists(createDriverDto.email)
    if (driverExists) {
      throw new BadRequestException('Driver with that email already exists.')
    }

    const driver = await this.driverService.createDriver(createDriverDto, client, user)

    return new Driver(driver)
  }
}
