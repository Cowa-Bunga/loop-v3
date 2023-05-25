import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags, ApiSecurity } from '@nestjs/swagger'
import { Client } from '../../shared/decorators/client.decorator'
import { ClientRequest } from '../../shared/entities/request.entity'
import { ClusterService } from './cluster.service'
import { ClusterDto } from './dto/cluster.dto'
import { ApiGetRequest, ApiGetOneRequest } from '../../shared/decorators/api.decorator' // Import the decorators

@ApiTags('Clusters')
@Controller('cluster')
@ApiSecurity('x-api-key')
export class ClusterController {
  constructor(private readonly clusterService: ClusterService) {}

  @Get(':cluster_id')
  @ApiGetOneRequest('cluster', { operation_content: 'Get cluster details by cluster_id' }) // Apply the decorator
  async getCluster(@Param('cluster_id') clusterId: string, @Client() client: ClientRequest) {
    const getClusterDto: ClusterDto = { clusterId }
    const client_id = client.id
    return await this.clusterService.getCluster(getClusterDto, client_id)
  }

  @Get('/branch/:branch_id')
  @ApiGetRequest('clusters', { operation_content: 'Get clusters by branch_id' }) // Apply the decorator
  async getClustersByBranch(@Param('branch_id') branchId: string, @Client() client: ClientRequest) {
    return this.clusterService.getClustersByBranch(client, branchId)
  }
}
