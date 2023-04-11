export interface IdbCowabungaUsersClients {
  uuid: string

  created_at: string
  created_by: string
  email: string
  name: string
  password: string
}

// <root>
export interface IdbCowabungaUsers {
  uuid: string

  clients: IdbCowabungaUsersClients[]
  created_at: string
  promisee: string
  promisor: string
}
