import { createContext, useContext } from 'react'

const UserContext = createContext({} as IUserContext)

export function UserWrapper({ children }) {
  const sharedState = {} as IUserContext

  return (
    <UserContext.Provider value={sharedState}>{children}</UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext)
}
