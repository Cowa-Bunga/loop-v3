/* eslint-disable @typescript-eslint/no-unused-vars */
enum EnumDbAbandonmentReasons {
  'Customer was not available',
  'Cannot locate customer',
  'Incorrect address',
  'Incorrect date scheduled',
  'Incorrect resource',
  'Not enough time to complete task',
  'No stock',
  'Refused entry to service'
}

enum EnumDbRatings {
  'Speed of delivery',
  'Accuracy of order',
  'Friendliness of driver',
  'Other'
}

enum EnumDbVehicleTypes {
  'E-bike',
  'Bike',
  'Car',
  'Bakkie'
}

enum EnumDbPermissionsScopes {
  'orders:create',
  'orders:recreate',
  'import:create'
}
