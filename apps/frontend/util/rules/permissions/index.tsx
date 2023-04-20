import { createContext } from 'react'
import { useUserContext } from '@context/user'
import { useContext } from '@hooks'

export const MODEL_LEGACY_PERMISSIONS = {
  name: 'Permissions',
  primaryKey: 'id',
  properties: {
    id: 'string',
    fleet: 'bool',
    administrator: 'bool',
    scopes: ['admin:all', 'admin:clients', 'admin:users']
  }
}

export const checkPermissions = (permissions: string[], required: string[]) => {
  return required.every((permission) => permissions.includes(permission))
}

interface IPermissionContext {
  canAccess: (required: string[]) => boolean
}

const PermissionContext = createContext<IPermissionContext>({
  canAccess: (required: string[]) => false
})

const PermissionsProvider = ({ children }) => {
  const {
    state: { permissions }
  } = useUserContext()

  const scopes = new Set(permissions.scopes || [])

  if (permissions.fleet) {
    scopes.add('fleet:access')
  }

  if (permissions.administrator) {
    scopes.add('admin:access')
  }

  const canAccess = (required: string[]) =>
    checkPermissions([...scopes], required)

  return (
    <PermissionContext.Provider value={{ canAccess }}>
      {children}
    </PermissionContext.Provider>
  )
}

function usePermissions() {
  return useContext(PermissionContext)
}

export { usePermissions, PermissionsProvider }
