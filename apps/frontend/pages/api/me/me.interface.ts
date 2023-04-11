export interface IMeInterface {
  client_id: string
  client_type: string
  user: IMeUser
  regions: IRegion[]
  hubs: IHub[]
  organization: IMeOrganization
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

export interface IRegion {
  hub_ids: string[]
  id: string
  name: string
}

export interface IHub {
  id: string
  name: string
  branches: IMeBranch[]
}

export interface IMeOrganization {
  id: string
  name: string
  logo: string
}

interface IMeBranch {
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
