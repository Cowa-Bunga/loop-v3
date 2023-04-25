export interface Base {
  uuid: string
  created_at: Date
}

export type DocumentReference = string

export interface GeoPoint {
  latitude: number
  longitude: number
}

declare interface DosPermissions {
  hubs: DocumentReference[]
  regions: DocumentReference[]
}

//TODO Check scope potential values
declare enum Scopes {
  ORDER_CREATE = 'orders:create',
  ORDER_RECREATE = 'orders:recreate',
  IMPORT_CREATE = 'imports:create'
}

export interface Permissions {
  administrator: boolean
  fleet: true
  dos: DosPermissions
  scopes: Scopes
}
