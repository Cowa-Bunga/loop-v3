import { Controller, Get, Param } from '@nestjs/common'
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags, ApiSecurity } from '@nestjs/swagger'
import { Client } from '../../shared/decorators/client.decorator'
import { ClientRequest } from '../../shared/entities/request.entity'
import { ClusterService } from './cluster.service'
import { ClusterDto } from './dto/cluster.dto'

@ApiTags('Clusters')
@Controller('cluster')
@ApiSecurity('x-api-key')
export class ClusterController {
  constructor(private readonly clusterService: ClusterService) {}

  @Get(':cluster_id')
  @ApiOperation({ summary: 'Get cluster details by cluster_id' })
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  async getCluster(@Param('cluster_id') clusterId: string, @Client() client: ClientRequest) {
    const getClusterDto: ClusterDto = { clusterId }
    const client_id = client.id
    return await this.clusterService.getCluster(getClusterDto,client_id)
  }

  @Get('/branch/:branch_id')
  @ApiOperation({ summary: 'Get clusters by branch_id' })
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  async getClustersByBranch(@Param('branch_id') branchId: string, @Client() client: ClientRequest) {
    const client_id = client.id
    return this.clusterService.getClustersByBranch(client_id, branchId)
  }
}