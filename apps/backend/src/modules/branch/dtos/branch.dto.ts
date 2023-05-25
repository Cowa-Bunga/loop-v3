export class CreateBranchDto {
  hub_id: string
  name: string
  contact: string
  address: string
  store_code: string
  dashboard_url: string
  location: {
    latitude: number
    longitude: number
  }
}
