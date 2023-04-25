export enum POOLING_ALGORITHMS {
  DISTRIBUTED = 'distrubted',
  SEQUENTIAL = 'sequential'
}

declare interface ClusterLock {
  collection_time_range: number
  strategy: string //TODO CHECK STRATEGY VALUES
  time: number
}

declare interface Cluster {
  distance: number
  enabled: boolean
  lock: ClusterLock
  size: number
}

declare interface Pooling {
  algorithm: POOLING_ALGORITHMS
  enabled: boolean
}

declare interface Tracking {
  logo_enabled: boolean
  ratings_enabled: boolean
}

declare interface TerminateOrders {
  enabled: boolean
  max_age: number
}

declare interface RouteOptimisation {
  priority: string //TODO CHECK PRIORITY VALUES
}

export default interface Settings {
  scan: boolean
  archived: boolean
  log_out_drivers: boolean
  sms_enabled: boolean
  use_third_party_api: boolean
  cluster: Cluster
  pooling: Pooling
  tracking: Tracking
  terminate_orders: TerminateOrders
  route_optimization: RouteOptimisation
}
