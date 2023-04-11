interface IdbIntegrationType {
  loop_webhook: boolean
  polling_api: string
}

// <root>
interface IdbEcommercePlatforms {
  uuid: string

  api_base_url: string
  integration_type: IdbIntegrationType
  name: string
}
