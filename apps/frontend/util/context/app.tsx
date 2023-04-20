import { createContext, useContext } from 'react'

const AppState = createContext({} as IappAppContext)

export function AppContext({ children }) {
  const sharedState = {} as IappAppContext
  return <AppState.Provider value={sharedState}>{children}</AppState.Provider>
}

export function useAppContext() {
  return useContext(AppState)
}

interface IappAppContext {
  session: null
  user: null
  settings: {
    permissions: []
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
  }
}
