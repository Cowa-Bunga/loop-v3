import { createContext, useContext } from 'react'

const AppState = createContext({} as IUserContext)

export function UserWrapper({ children }) {
  const sharedState = {} as IUserContext
  return <AppState.Provider value={sharedState}>{children}</AppState.Provider>
}

export function useUserContext() {
  return useContext(AppState)
}
