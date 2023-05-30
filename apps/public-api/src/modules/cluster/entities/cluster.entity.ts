import { ClusterOrder } from '../dto/cluster.dto' 


export class Cluster {
  id: string
  active: boolean
  status: string
  branch: { id: string } 
  orders: ClusterOrder[]

  constructor(args: any) {
    this.id = args.id
    this.active = args.active
    this.status = args.status
  }
}