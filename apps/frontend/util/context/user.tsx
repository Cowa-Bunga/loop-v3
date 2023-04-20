import { createContext } from 'react'
import { useContext, useEffect, useMergeState } from '@hooks'
import { IUserContext } from '@util/types/IappContext'
import { useSession } from 'next-auth/react'
import { authFirebase } from '@util/lib/firebase'
import { getAuth } from 'firebase/auth'
import { useFirebaseApp } from 'reactfire'

const UserContext = createContext({
  state: {} as IUserContext,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  update: (updated: object) => {}
})

function UserWrapper({ children }) {
  const initialState = {
    hubs: [],
    regions: [],
    permissions: {
      fleet: false,
      administrator: false,
      scopes: []
    }
  } as IUserContext
  const [state, updateState] = useMergeState(initialState)
  const firebaseAuth = getAuth(useFirebaseApp())
  const { data } = useSession()
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
    if (userContext) {
      updateState(JSON.parse(userContext))
    }

    if (data) {
      const session = {
        ...data.user
      } as ISessionUser
      if (session.firebase_token) {
        authFirebase(firebaseAuth, session.firebase_token)
      }
    }
  }, [])

  return (
    <UserContext.Provider value={{ state, update }}>
      {children}
    </UserContext.Provider>
  )
}

function useUserContext() {
  return useContext(UserContext)
}

export { useUserContext, UserWrapper }
