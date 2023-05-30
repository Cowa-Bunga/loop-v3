import { Injectable, NotFoundException } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { ClusterDto, Cluster, GeoCode } from './dto/cluster.dto'
import { BranchService } from '../branch/branch.service'
import { ClientRequest } from '../../shared/entities/request.entity'

@Injectable()
export class ClusterService {
  constructor(private readonly branchService: BranchService) {}

  async getCluster(getClusterDto: ClusterDto, client_id: string): Promise<any> {
    const { clusterId } = getClusterDto
    const db = admin.firestore()
    const cluster = await db.collection('clients').doc(client_id).collection('clusters').doc(clusterId).get()

    if (!cluster.exists) {
      throw new NotFoundException('Cluster does not exist')
    }

    return {
      id: cluster.id,
      ...cluster.data()
    }
  }

  async getClustersByBranch(
    client: ClientRequest,
    branch_id: string
  ): Promise<Cluster[]> {
    const clusters = await this.getActiveClusters(client.id, branch_id)
    const result = await Promise.all(
      clusters.map(async (cluster) => {
        const branch = await this.branchService.getBranch(client, branch_id)
        const orders = await this.getOrdersInCluster(
          client.id,
          cluster.order_ids
        )
        return new Cluster(cluster, branch, orders)
      })
    )

    return result
  }

  private async getOrdersInCluster(client_id: string, orderIds: string[]): Promise<any[]> {
    if (!orderIds || orderIds.length === 0) {
      return []
    }
    const db = admin.firestore()
    const refs = orderIds.map((id) => db.doc(`clients/${client_id}/orders/${id}`))
    const snapshot = await db.getAll(...refs)

    const orders = snapshot.map((doc) => {
      if (!doc.exists) {
        throw new NotFoundException(`Order ${doc.id} does not exist`)
      }

      const orderData = doc.data()
      const branchData = orderData.branch
      const customerData = orderData.customer

      const order = {
        id: doc.id,
        ...orderData,
        client_id,
        branch: {
          id: branchData.id,
          name: branchData.name,
          address: branchData.address,
          location: new GeoCode(branchData.location._latitude, branchData.location._longitude),
          store_code: branchData.store_code,
          dashboard_url: branchData.dashboard_url
        },
        customer: {
          name: customerData.name,
          mobile_no: customerData.mobile_no
        }
      }

      return order
    })

    return orders
  }

  private async getActiveClusters(client_id: string, branch_id: string): Promise<any[]> {
    const db = admin.firestore()
    const querySnapshot = await db
      .collection('clients')
      .doc(client_id)
      .collection('clusters')
      .where('branch', '==', db.doc(`/clients/${client_id}/branches/${branch_id}`))
      .where('active', '==', true)
      .where('status', '==', 'open')
      .get()

    const clusters = []
    querySnapshot.forEach((doc) => {
      clusters.push({ id: doc.id, ...doc.data() })
    })

    return clusters
  }
}
