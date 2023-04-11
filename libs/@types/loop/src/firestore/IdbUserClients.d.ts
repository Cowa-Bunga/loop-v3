export interface IdbUserClientsPermissions {
  administrator: boolean
  fleet: false
}

export interface IdbUserClient {
  client_ref: string
  logo: string
  name: string
  permissions: IdbUserClientPermissions
  user_ref: string
}

// <root>
export interface IdbUserClients {
  uuid: string

  clients: IdbUserClient[]
}
