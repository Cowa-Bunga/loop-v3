import { useRouter, useSession, useEffect, useState } from '@hooks'
import { FirestoreProvider, useFirebaseApp } from 'reactfire'
import { getFirestore } from 'firebase/firestore'
import { authFirebase } from '@util/lib/firebase'
import { useUserContext } from '@context/user'
import { getAuth } from 'firebase/auth'

export default function FirebaseWrapper({ children }) {
  const [hasInitialised, setHasInitialised] = useState(false)
  const router = useRouter()
  const { data, status } = useSession()
  const firestoreInstance = getFirestore(useFirebaseApp())
  const userContext = useUserContext()
  const firebaseAuth = getAuth(useFirebaseApp())

  useEffect(() => {
    if (status === 'authenticated' && !hasInitialised) {
      setHasInitialised(true)
      console.warn('firebase init', {
        status,
        hasInitialised,
        firestoreInstance,
        userContext,
        data
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
