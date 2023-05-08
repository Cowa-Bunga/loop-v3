
interface IappGlobalContext {
  session: ISessionUser

  auth: {
    token: string
    api: string
    expires: string
    secret: string
  }

  user: IClient

  settings: {
    permissions: []
    preferences: []
  }

  theme: {
    logo: string
    mode: 'light' | 'dark'
    primaryColor: string
    secondaryColor: string
  }

  notifications: string[]

  log: string[]
}