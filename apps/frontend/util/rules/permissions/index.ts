export const MODEL_LEGACY_PERMISSIONS = {
  name: 'Permissions',
  primaryKey: 'id',
  properties: {
    id: 'string',
    fleet: 'bool',
    administrator: 'bool',
    scopes: ['orders:create', 'orders:recreate', 'import:create']
  }
}

// WIP - TODO: Add all permissions and share library with backend
export const MODEL_PERMISSIONS = [
  // ----- ADMIN
  'admin:all',
  'admin:clients',
  'admin:users',
  'admin:permissions',
  'admin:settings',
  'admin:logs',
  'admin:reports',
  'admin:billing',
  'admin:notifications',
  'admin:alerts',
  'admin:alerts:all',
  'admin:alerts:clients',
  'admin:alerts:users',
  'admin:alerts:permissions',
  'admin:alerts:reports',
  'admin:alerts:billing',
  'admin:alerts:notifications',

  // ----- DRIVER
  'driver:all',
  'driver:clients',

  // ----- FLEET
  'fleet:all',
  'fleet:clients',

  // ----- MODULES
  'mod:all',
  'mod:map',
  'mod:reports',
  'mod:intelligence',
  'mod:alerts',
  'mod:notifications',
  'mod:billing',

  // ---- INTEGRATIONS
  'int:all',
  'int:google:traffic',
  'int:google:reports',
  'int:google:maps',
  'int:google:geocoding',
  'int:google:places',
  'int:google:directions',
  'int:google:distance',
  'int:google:geolocation',
  'int:google:geofence',

  'int:dataflow:all',
  'int:dataflow:clients',

  // ----- CLIENT
  'client:all',
  'client:map',
  'client:tracking'
]

export const checkPermissions = (permissions: string[], required: string[]) => {
  return required.every((permission) => permissions.includes(permission))
}
