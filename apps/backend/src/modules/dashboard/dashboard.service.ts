import { BadRequestException, Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { ClientRequest, UserRequest } from '../../shared/entities/request.entity'
import { HubService } from '../hub/hub.service'
import { BranchService } from '../branch/branch.service'
import { EssentialBranch } from '../branch/entities/branch.entity'
import { EssentialHub } from '../hub/entities/hub.entity'

@Injectable()
export class DashboardService {
  constructor(private hubService: HubService, private branchService: BranchService) {}

  async getAll(client: ClientRequest, user: UserRequest) {
    if (user.hub_refs.length === 0) {
      throw new BadRequestException('User has access to no hubs')
    }
    /**
     * 1. Loop through hubs
     * 2. Get All branches for each hub
     * 3. Get all orders for each branch
     */

    const db = admin.firestore()
    const hubData = user.hub_refs.map(async (ref) => {
      const hub: EssentialHub = await this.hubService.getHub(ref, true)
      const branches: EssentialBranch[] = await this.branchService.getBranchesForHub(ref, client.id, true)
      return {
        hub,
        branches
      }
    })
    const data = await Promise.all(hubData)
    return data
  }
}
