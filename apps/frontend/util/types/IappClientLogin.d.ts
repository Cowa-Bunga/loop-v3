interface IClientLogin {
  success: boolean
  body: IClientBody
}

interface IClientBody {
  id: string
  clients: IClient
}

interface IClient {
  user_id: string
  permissions_id: string
  client_id: string
  logo: string
  name: string
  permissions: IUserPermissions
}

interface IUserPermissions {
  fleet: boolean
  administrator: boolean
  scopes: string[]
}

interface IGenerateTokenAndSignPayload {
  client_id: string
  user_id: string
  logo: string
  password: string
  permissions: IClientPermissions
}
