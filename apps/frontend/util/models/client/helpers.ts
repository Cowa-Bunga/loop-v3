import { defaultsDeep } from 'lodash'
import { MODEL_CLIENT_EMPTY } from './model'

export const modelClientList = (
  data: { [s: string]: unknown } | ArrayLike<unknown>
): IClient[] => {
  return Object.entries(data)
    .map(modelClientData)
    .map((el: never) => el['1'])
    .sort((a: IClient, b: IClient) => a.name.localeCompare(b.name))
}

export const modelClientData = (data: unknown): IClient => {
  return defaultsDeep(data, MODEL_CLIENT_EMPTY)
}
