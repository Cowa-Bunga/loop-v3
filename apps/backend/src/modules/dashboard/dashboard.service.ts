import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { ClientRequest, UserRequest } from '../../shared/entities/request.entity'
import { HubService } from '../hub/hub.service'
import { BranchService } from '../branch/branch.service'
import { EssentialBranch } from '../branch/entities/branch.entity'
import { EssentialHub, Hub } from '../hub/entities/hub.entity'
import { OrderService } from '../order/order.service'
import { DriverService } from '../driver/driver.service'
import { EssentialDriver } from '../driver/entities/driver.entity'
import { EssentialOrder } from '../order/entities/order.entity'

@Injectable()
export class DashboardService {
  constructor(
    private hubService: HubService,
    private branchService: BranchService,
    private orderService: OrderService,
    private driverService: DriverService
  ) {}

  async getAll(client: ClientRequest, user: UserRequest) {
    if (user.hub_refs.length === 0) {
      throw new BadRequestException('User has access to no hubs')
    }
    const hubData = await Promise.all(
      user.hub_refs.map(async (ref) => {
        const hubPromise = this.hubService.getHub(ref)
        const driverPromise = this.driverService.getDriversForHub(ref.id, client.id)
        const branchDocs = await this.branchService.getBranchesForHub(ref, client.id)
        const branches = branchDocs.map((doc) => new EssentialBranch(doc))

        // Loop through all branch documents and retrieve orders for branch
        await Promise.all(
          branches.map(async (branch) => {
            const orderDocs = await this.orderService.getOrdersForBranch(branch.id, client)
            const orders = orderDocs.map((doc) => new EssentialOrder(doc))
            branch.setOrders(orders)
          })
        )

        const [hubDoc, driverDocs] = await Promise.all([hubPromise, driverPromise])
        const drivers = driverDocs.map((doc) => new EssentialDriver(doc))
        const hub = new EssentialHub(hubDoc)

        return {
          ...hub,
          branches,
          drivers
        }
      })
    )

    const data = { hubs: hubData }

    return data
  }
}
