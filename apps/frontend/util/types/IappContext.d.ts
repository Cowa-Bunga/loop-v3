import {
  IHub,
  IOrganization,
  IOrganization,
  IRegion
} from '@pages/api/me/me.interface'

interface IUserContext {
  id: string
  firstName: string
  lastName: string
  mobileNo: string
  organization: IOrganization
  permissions: IUserPermissions
  regions: IRegion[]
  hubs: IHub[]
  client: IClient
  firebase_token: string
}
