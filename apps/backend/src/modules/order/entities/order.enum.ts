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
  COLLECTED = 'collected',
  IN_TRANSIT = 'in_transit',
  ARRIVED = 'arrived',
  DELIVERED = 'delivered',
  ABANDONED = 'abandoned',
  RETURNED = 'returned',
  CANCELLED = 'cancelled',
}

export const ORDER_STATUS_DISPLAY = {
  [ORDER_STATUS.PENDING]: 'Pending',
  [ORDER_STATUS.COLLECTED]: 'Collected',
  [ORDER_STATUS.IN_TRANSIT]: 'In Transit',
  [ORDER_STATUS.ARRIVED]: 'Arrived',
  [ORDER_STATUS.DELIVERED]: 'Delivered',
  [ORDER_STATUS.ABANDONED]: 'Abandoned',
  [ORDER_STATUS.RETURNED]: 'Returned',
  [ORDER_STATUS.CANCELLED]: 'Cancelled',
}