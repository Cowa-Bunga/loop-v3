import { IClient } from '../../../../libs/auth/IclientLogin';
import { defaultsDeep } from 'lodash';

export const modelClientList = (data: any): IClient[] => {
  return Object.entries(data)
    .map(modelClientData)
    .map((el: never) => el['1'])
    .sort((a: IClient, b: IClient) => a.name.localeCompare(b.name));
};

export const modelClientData = (data: any): IClient => {
  return defaultsDeep(data, emptyClientModel);
};
export const emptyClientModel: IClient = {
  client_id: '',
  name: '',
  user_id: '',
  permissions_id: '',
  logo: '',
  permissions: {
    scopes: [],
    fleet: false,
    administrator: false
  }
};
