import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common'
import { BranchService } from './branch.service'
import { ApiGetOneRequest, ApiPostRequest } from '../../shared/decorators/api.decorator'
import { CreateBranchDto } from './dtos/branch.dto'
import { Client } from '../../shared/decorators/client.decorator'
import { User } from '../../shared/decorators/user.decorator'
import { ClientRequest, UserRequest } from '../../shared/entities/request.entity'
import { Branch } from './entities/branch.entity'

@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @ApiPostRequest('Branch', CreateBranchDto)
  @Post()
  async createBranch(
    @Body() createBranchDto: CreateBranchDto,
    @Client() client: ClientRequest,
    @User() user: UserRequest
  ): Promise<Branch> {
    // Check if a branch with that name already exists
    const branchExists = await this.branchService.checkBranchExists(client, createBranchDto.name)
    if (branchExists) {
      throw new BadRequestException('Branch with that name already exists.')
    }

    const branch = await this.branchService.createBranch(createBranchDto, client, user)

    return new Branch(branch)
  }

  @ApiGetOneRequest('Branch')
  @Get(':branch_id')
  async getBranch(@Client() client: ClientRequest, @Param('branch_id') branch_id: string): Promise<Branch> {
    const branch = await this.branchService.getBranch(client, branch_id)

    return new Branch(branch)
  }
}
