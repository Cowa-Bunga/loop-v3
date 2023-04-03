import { Session } from 'next-auth';

export interface IGenerateTokenResponse {
  token: string;
  firebase_token: string;
  expires_in: int;
  token_type: string;
}

export interface ISessionUser extends Session {
  firebase_token: string;
  client_id: string;
}
