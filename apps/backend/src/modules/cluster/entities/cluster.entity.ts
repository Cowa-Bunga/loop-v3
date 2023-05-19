import { DocumentSnapshot } from '@google-cloud/firestore'

export class Cluster {
  id: string
  constructor(cluster: DocumentSnapshot) {
    this.id = cluster.id
  }

}