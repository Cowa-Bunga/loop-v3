
interface IdbClientUsersClients {
  uuid: string
  permissions: IdbPermissions
  user_client_ref: string
  user_ref: string
}

// <root>
interface IdbClientUsers {
  uuid: string
  clients: IdbClientUsersClients[]
  created_at: string
  created_by: string
  email: string
  firstname: string
  lastname: string
  mobile_no: string
  password: string
}