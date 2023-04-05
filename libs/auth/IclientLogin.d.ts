export interface IClientLogin {
  success: boolean;
  body: IClientBody;
}

export interface IClientBody {
  id: string;
  clients: IClient;
}

export interface IClient {
  user_id: string;
  permissions_id: string;
  client_id: string;
  logo: string;
  name: string;
  permissions: IUserPermissions;
}

export interface IUserPermissions {
  fleet: boolean;
  administrator: boolean;
  scopes: string[];
}

export interface IGenerateTokenAndSignPayload {
  client_id: string;
  user_id: string;
  logo: string;
  password: string;
  permissions: IClientPermissions;
}
