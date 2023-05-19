import { Injectable, NotFoundException } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { ClusterDto, Cluster, GeoCode, ClusterBranch} from './dto/cluster.dto'

@Injectable()
export class ClusterService {

  async getCluster(getClusterDto: ClusterDto, client_id: string): Promise<any> {
    const { clusterId } = getClusterDto
    const db = admin.firestore()
    const cluster = await db
      .collection('clients')
      .doc(client_id)
      .collection('clusters')
      .doc(clusterId)
      .get()

    if (!cluster.exists) {
      throw new NotFoundException('Cluster does not exist')
    }

    return {
      id: cluster.id,
      ...cluster.data(),
    }
  }

  async getClustersByBranch(client_id: string, branch_id: string): Promise<Cluster[]> {
    const clusters = await this.getActiveClusters(client_id, branch_id)
    const result = await Promise.all(
      clusters.map(async (cluster) => {
        const branch = await this.getBranch(client_id, cluster.branch.id)
        const orders = await this.getOrdersInCluster(client_id, cluster.order_ids)
        return new Cluster(cluster, branch, orders)
      })
    )
  
    return result
  }

  private async getBranch(client_id: string, branch_id: string): Promise<any> {
    const db = admin.firestore()
    const branchSnapshot = await db
      .collection('clients')
      .doc(client_id)
      .collection('branches')
      .doc(branch_id)
      .get()

    const branchData = branchSnapshot.data()


    const branch = new ClusterBranch(
      branch_id,
      branchData.name,
      branchData.address,
      new GeoCode(branchData.location._latitude, branchData.location._longitude),
      branchData.store_code,
      branchData.dashboard_url
    )

    return branch
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

      const orderData = {
        id: doc.id,
        ...doc.data(),
        client_id,
        branch: {
          id: doc.data().branch.id,
          name: doc.data().branch.name,
          address: doc.data().branch.address,
          location: new GeoCode(doc.data().branch.location._latitude, doc.data().branch.location._longitude),
          store_code: doc.data().branch.store_code,
          dashboard_url: doc.data().branch.dashboard_url,
        },
        customer: {
          name: doc.data().customer.name,
          mobile_no: doc.data().customer.mobile_no,
        },
      }

      return orderData
    })

    return orders
  }

  private async getActiveClusters(client_id: string, branch_id: string): Promise<any[]> {
    const db = admin.firestore()
    console.log("client ID",client_id)
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
