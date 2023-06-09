import test from 'firebase-functions-test'
import { jest } from '@jest/globals'
import { QueryDocumentSnapshot, QuerySnapshot, DocumentSnapshot } from 'firebase-admin/firestore'
import { ClientRequest, UserRequest } from '../entities/request.entity'

export class FirebaseTestingUtils {
  collection = jest.fn()
  where = jest.fn()
  doc = jest.fn()
  get = jest.fn()
  getAll = jest.fn()
  set = jest.fn()
  update = jest.fn()
  constructor() {
    this.where.mockReturnValue({
      where: this.where,
      get: this.get
    })

    this.doc.mockReturnValue({
      collection: this.collection,
      get: this.get,
      set: this.set,
      update: this.update
    })

    this.collection.mockReturnValue({
      doc: this.doc,
      where: this.where,
      get: this.get
    })
  }
}
export class TestingUtils extends FirebaseTestingUtils {
  client: ClientRequest
  user: UserRequest

  constructor(client_id = 'client_id', user_id = '') {
    super()
    this.client = this.generateClientRequest(client_id)
    this.user = this.generateUserRequest(user_id)
  }

  generateDocumentSnapshot = <T>(data: T, ref: string): DocumentSnapshot => {
    const snapshot = test().firestore.makeDocumentSnapshot(data, ref)
    return snapshot
  }

  generateQuerySnapshot = (docs: QueryDocumentSnapshot[]): Partial<QuerySnapshot> => {
    const snapshot: Partial<QuerySnapshot> = {
      docs
    }

    return snapshot
  }

  private generateClientRequest = (client_id = 'client_id'): ClientRequest => {
    const data = {
      id: client_id,
      name: 'client_name',
      sms_enabled: true,
      email_enabled: true
    }
    const clientSnapshot = this.generateDocumentSnapshot(data, `clients/${client_id}`)
    return new ClientRequest(clientSnapshot)
  }

  private generateUserRequest = (user_id = 'user_id'): UserRequest => {
    const data = {
      id: user_id,
      hub_refs: ['hub_id']
    }
    const clientSnapshot = this.generateDocumentSnapshot(data, `client-users/${user_id}`)
    return new UserRequest(clientSnapshot)
  }
}
