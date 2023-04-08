import { createContext, useContext } from 'react'
import { IUserPermissions } from '../../../../libs/@types/loop/src/loop-api/IclientLogin'

const AppState = createContext({} as IappAppContext)

export function AppContext({ children }) {
  const sharedState = {} as IappAppContext
  return <AppState.Provider value={sharedState}>{children}</AppState.Provider>
}

export function useAppContext() {
  return useContext(AppState)
}

interface IappAppContext {
  organisation: {
    id: string
    name: string
    logo: string
    locations: {
      lat: number
      lng: number
    }[]
    permissions: IUserPermissions[]
    model: []
  }
  theme: {
    mode: 'light' | 'dark'
    primaryColor: string
    secondaryColor: string
  }
  layout: {
    nav: {
      logo: string
    }
    menu: {
      open: boolean
      logo: string
      model: IMenu[]
    }
  }
}
