export enum EnumDbAbandonmentReasons {
  'Customer was not available',
  'Cannot locate customer',
  'Incorrect address',
  'Incorrect date scheduled',
  'Incorrect resource',
  'Not enough time to complete task',
  'No stock',
  'Refused entry to service'
}

export enum EnumDbRatings {
  'Speed of delivery',
  'Accuracy of order',
  'Friendliness of driver',
  'Other'
}

export enum EnumDbVehicleTypes {
  'E-bike',
  'Bike',
  'Car',
  'Bakkie'
}

export enum EnumDbPermissionsScopes {
  'orders:create',
  'orders:recreate',
  'import:create'
}
