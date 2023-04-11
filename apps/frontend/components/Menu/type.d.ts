interface IMenu {
  id?: string
  title: string
  link?: string
  action?: () => void
  icon?: Component
  permissions?: EnumDbPermissionsScopes[]
  children?: IMenu[]
}

interface IMenuProps {
  open?: boolean
  setOpen?: (open: boolean) => void
}
