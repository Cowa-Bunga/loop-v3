import { IMeHub, IMeOrganization } from '@pages/api/me/me.interface'

interface IUserContext {
  id: string
  firstName: string
  lastName: string
  mobileNo: string
  organization: IMeOrganization
  permissions: IUserPermissions
  regions: string[]
  hubs: IMeHub[]
  client: IClient
  firebase_token: string
}
