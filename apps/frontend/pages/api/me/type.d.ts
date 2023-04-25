interface IMeInterface {
  client_id: string
  client_type: string
  user: IMeUser
  regions: IRegion[]
  hubs: IHub[]
  organization: IOrganization
}

interface IMeUser {
  administrator: boolean
  email: string
  firstname: string
  fleet: boolean
  id: string
  lastname: string
  mobile_no: string
}

interface IRegion {
  hub_ids: string[]
  id: string
  name: string
}

interface IHub {
  id: string
  name: string
  branches: IBranch[]
}

interface IOrganization {
  id: string
  name: string
  logo: string
}

interface IBranch {
  id: string
  address: string
  dashboard_url: string
  location: {
    lat: number
    lng: number
  }
  name: string
  store_code: string
}
