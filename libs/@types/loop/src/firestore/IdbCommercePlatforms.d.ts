export interface IdbIntegrationType {
  loop_webhook: boolean
  polling_api: string
}

// <root>
export interface IdbEcommercePlatforms {
  uuid: string

  api_base_url: string
  integration_type: IdbIntegrationType
  name: string
}
