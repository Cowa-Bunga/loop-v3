import { IHub, IOrganization, IRegion } from '@pages/api/me/type'

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
}
