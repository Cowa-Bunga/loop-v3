import { BadRequestException, Injectable } from '@nestjs/common'
import { ClientRequest, UserRequest } from '../../shared/entities/request.entity'
import { HubService } from '../hub/hub.service'
import { BranchService } from '../branch/branch.service'
import { EssentialBranch } from '../branch/entities/branch.entity'
import { EssentialHub } from '../hub/entities/hub.entity'
import { OrderService } from '../order/order.service'
import { DriverService } from '../driver/driver.service'
import { EssentialDriver } from '../driver/entities/driver.entity'
import { EssentialOrder } from '../order/entities/order.entity'
import { TripService } from '../trip/trip.service'
import { ClusterService } from '../cluster/cluster.service'


@Injectable()
export class DashboardService {
  constructor(
    private hubService: HubService,
    private branchService: BranchService,
    private orderService: OrderService,
    private driverService: DriverService,
    private tripService: TripService,
    private clusterService: ClusterService
  ) {}
  

  async getAll(client: ClientRequest, user: UserRequest) {
    if (user.hub_refs.length === 0) {
      throw new BadRequestException('User has access to no hubs')
    }
    const hubData = await Promise.all(
      user.hub_refs.map(async (ref) => {
        const hubPromise = this.hubService.getHub(ref)
        const driverPromise = this.driverService.getDriversForHub(client, ref)
        const branchDocs = await this.branchService.getBranchesForHub(client, ref)
        const branches = branchDocs.map((doc) => new EssentialBranch(doc))
        

        // Loop through all branch documents and retrieve orders and trips for branch
        const branchPromises = branches.map(async (branch) => {
          const orderDocs = await this.orderService.getOrdersForBranch(client, branch.id)
          const orders = orderDocs.map((doc) => new EssentialOrder(doc))
          branch.setOrders(orders)
          const trips = await this.tripService.getTripsByBranchIds(
            [branch.id],
            client.id,
            ["pending", "accepted", "arrived_at_collection_point", "started", "in_progress"]
          )

          const clusters = await this.clusterService.getClustersByBranch(client, branch.id)

          
          return { branch, trips, clusters}
        })

        const [hubDoc, driverDocs, branchData] = await Promise.all([
          hubPromise,
          driverPromise,
          Promise.all(branchPromises),
        ])
  
        const drivers = driverDocs.map((doc) => new EssentialDriver(doc))
        const hub = new EssentialHub(hubDoc)
  
        return {
          ...hub,
          branches: branchData.map(({ branch }) => branch),
          drivers,
          trips: branchData.flatMap(({ trips }) => trips),
          clusters: branchData.flatMap(({ clusters }) => clusters),
        }
      })
    )
    const data = { hubs: hubData }

    return data
  }
}