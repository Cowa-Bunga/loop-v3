export interface Idb3plPartnersHooks {
  created: string
}

// <root>
export interface Idb3plPartners {
  uuid: string

  name: string
  hooks: IdbUserClient[]
}
