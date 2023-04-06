import {
  IClient,
  IUserPermissions
} from '../../../../../libs/auth/IclientLogin'

export interface IGenerateTokenResponse {
  token: string;
  firebase_token: string;
  expires_in: int;
  token_type: string;
}

export interface ISessionUser {
  user_id: string;
  client_id: string;
  clients: IClient[];
  logoUrl: string;
  email: string;
  token: string;
  firebase_token: string;
  permissions: IUserPermissions;
  tokenType: string;
  maxAge: number;
}
