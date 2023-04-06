interface IdbUserClientsPermissions {
  administrator: boolean
  fleet: false
}

interface IdbUserClient {
  client_ref: string
  logo: string
  name: string
  permissions: IdbUserClientPermissions
  user_ref: string
}

// <root>
interface IdbUserClients {
  uuid: string

  clients: IdbUserClient[]
}
