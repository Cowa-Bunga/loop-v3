import defaultsDeep from 'lodash/defaultsDeep'

export const modelClientList = (
  data: { [s: string]: unknown } | ArrayLike<unknown>
): IClient[] => {
  return Object.entries(data)
    .map(modelClientData)
    .map((el: never) => el['1'])
    .sort((a: IClient, b: IClient) => a.name.localeCompare(b.name))
}

export const modelClientData = (data): IClient => {
  return defaultsDeep(data, emptyClientModel)
}
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
}
