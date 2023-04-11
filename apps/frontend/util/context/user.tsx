import { createContext, useContext } from 'react'
import { useMergeState } from '@hooks'
import { IUserContext } from '@util/types/IappContext'

const UserContext = createContext({
  state: {} as IUserContext,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  update: (updated: object) => {}
})

export function UserWrapper({ children }) {
  const [state, updateState] = useMergeState({} as IUserContext)

  const update = (updated: object) => {
    updateState(updated as IUserContext)
  }
  return (
    <UserContext.Provider value={{ state, update }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext)
}
