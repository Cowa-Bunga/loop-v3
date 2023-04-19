import { createContext, useContext, useEffect } from 'react'
import { useMergeState } from '@hooks'
import { IUserContext } from '@util/types/IappContext'
import { useSession } from 'next-auth/react'
import { authFirebase } from '@util/lib/firebase'
import { getAuth } from 'firebase/auth'
import { useFirebaseApp } from 'reactfire'

const UserContext = createContext({
  state: {} as IUserContext,
  update: (updated: object) => updated
})

export function UserWrapper({ children }) {
  const initialState = {
    hubs: [],
    regions: []
  }

  const [state, updateState] = useMergeState(initialState)
  const firebaseAuth = getAuth(useFirebaseApp())
  const { data } = useSession()
  const update = (updated: object) => {
    updateState(updated as IUserContext)
  }

  useEffect(() => {
    // temp caching method for user context to persist beyond browser reload...
    // need to find a better way to do this as this data will become stale
    // TODO: may pose security risk
    if (JSON.stringify(initialState) !== JSON.stringify(state)) {
      localStorage.setItem('userContext', JSON.stringify(state))
    }
  })

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

export function useUserContext() {
  return useContext(UserContext)
}
