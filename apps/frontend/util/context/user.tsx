import { createContext, useContext, useEffect } from 'react'
import { useMergeState } from '@hooks'
import { IUserContext } from '@util/types/IappContext'

const UserContext = createContext({
  state: {} as IUserContext,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  update: (updated: object) => {}
})

export function UserWrapper({ children }) {
  const initialState = {
    hubs: [],
    regions: []
  } as IUserContext
  const [state, updateState] = useMergeState(initialState)

  const update = (updated: object) => {
    updateState(updated as IUserContext)
  }

  useEffect(() => {
    // temp caching method for user context to persist beyond browser reload...
    // need to find a better way to do this as this data will become stale
    if (JSON.stringify(initialState) !== JSON.stringify(state)) {
      localStorage.setItem('userContext', JSON.stringify(state))
    }
  }, [state])

  useEffect(() => {
    const userContext = localStorage.getItem('userContext')
    console.log('fetching user context', userContext)
    if (userContext) {
      updateState(JSON.parse(userContext))
    }
  }, [])

  return (
    <UserContext.Provider value={{ state, update }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext)
}
