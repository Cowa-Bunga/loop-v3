interface IMenu {
  id?: string
  title: string
  link?: string
  action?: () => void
  icon?: string
  permissions?: EnumDbPermissionsScopes[]
  children?: IMenu[]
}
