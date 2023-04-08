import { ReactComponent } from '../../index'
interface IMenu {
  id?: string
  title: string
  link?: string
  action?: () => void
  icon?: () => ReactComponent
  permissions?: EnumDbPermissionsScopes[]
  children?: IMenu[]
}

interface IMenuProps {
  open: boolean
  setOpen: (open: boolean) => void
}
