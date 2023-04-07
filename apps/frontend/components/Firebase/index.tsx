import { getAnalytics } from 'firebase/analytics'
import { useRouter, useSession, useLayoutEffect, useState } from '@hooks'
import { FirestoreProvider, useFirebaseApp } from 'reactfire'
import { getFirestore } from 'firebase/firestore'
import { authFirebase } from '@util/lib/firebase'
import { useUserContext } from '@context/user'
import { getAuth } from 'firebase/auth'
import { app } from '@util/lib/firebase'

export default function FirebaseWrapper({ children }) {
  const [hasInitialised, setHasInitialised] = useState(false)
  const analytics = getAnalytics(app)
  const router = useRouter()
  const { data, status } = useSession()
  const firestoreInstance = getFirestore(useFirebaseApp())
  const userContext = useUserContext()
  const firebaseAuth = getAuth(useFirebaseApp())

  useLayoutEffect(() => {
    if (status === 'authenticated' && !hasInitialised) {
      setHasInitialised(true)

      console.warn('firebase init ran data', {
        analytics,
        firestoreInstance,
        userContext: userContext,
        data,
        status,
        hasInitialised,
        firebaseAuth
      })

      const userSession = { ...data.user } as ISessionUser
      userContext.firebase_token = userSession.firebase_token

      if (userSession.clients.length == 1) {
        userContext.client = userSession.clients[0]
      } else {
        router.push('/auth/client_select')
      }

      authFirebase(firebaseAuth, userSession.firebase_token)
    } else {
      router.push('/auth/signin')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FirestoreProvider sdk={firestoreInstance}>{children}</FirestoreProvider>
  )
}
