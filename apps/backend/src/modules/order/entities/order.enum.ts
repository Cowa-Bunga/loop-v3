export enum ORDER_TYPE {
  TASK = 'task',
  ORDER = 'order'
}

export enum TASK_TYPE {
  DELIVERY = 'delivery',
  COLLECTION = 'collection'
}

export enum ABANDON_FLOW_TYPE {
  DEFAULT = 'default',
  MULTI = 'multi'
}

export enum ORDER_STATUS {
  PENDING = 'pending',
  CLUSTERING = 'clustering',
  BATCHED = 'batched',
  ARRIVED_AT_COLLECTION = 'arrived_at_collection_point',
  COLLECTED = 'collected',
  IN_TRANSIT = 'in_transit',
  ARRIVED = 'arrived',
  DELIVERED = 'delivered',
  ABANDONED = 'abandoned',
  RETURNED = 'returned',
  CANCELLED = 'cancelled',
  SYSTEM_TERMINATED = 'system_terminated',
}

export const ORDER_STATUS_DISPLAY = {
  [ORDER_STATUS.PENDING]: 'Pending',
  [ORDER_STATUS.CLUSTERING]: 'Clustering',
  [ORDER_STATUS.BATCHED]: 'Batched',
  [ORDER_STATUS.ARRIVED_AT_COLLECTION]: 'Arrived at Collection Point',
  [ORDER_STATUS.COLLECTED]: 'Collected',
  [ORDER_STATUS.IN_TRANSIT]: 'In Transit',
  [ORDER_STATUS.ARRIVED]: 'Arrived',
  [ORDER_STATUS.DELIVERED]: 'Delivered',
  [ORDER_STATUS.ABANDONED]: 'Abandoned',
  [ORDER_STATUS.RETURNED]: 'Returned',
  [ORDER_STATUS.CANCELLED]: 'Cancelled',
  [ORDER_STATUS.SYSTEM_TERMINATED]: 'System Terminated',
}