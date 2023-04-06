import { Box } from '@mui/material'
import { NavBar } from '@components'
import { useRouter, useSession, useLayoutEffect, useTranslation } from '@hooks'
import { FirestoreProvider, useFirebaseApp } from 'reactfire'
import { getFirestore } from 'firebase/firestore'
import { ui } from './style'
import { authFirebase } from '@util/lib/firebase'
import { useUserContext } from '@context/user_context'
import { getAuth } from 'firebase/auth'

const LayoutBase = ({ children }) => {
  const router = useRouter()
  const { data, status } = useSession()
  const firestoreInstance = getFirestore(useFirebaseApp())
  const { t } = useTranslation()
  const user = useUserContext()
  const firebaseAuth = getAuth(useFirebaseApp())

  useLayoutEffect(() => {
    if (status === 'authenticated') {
      const session = { ...data.user } as ISessionUser
      user.firebase_token = session.firebase_token
      console.warn(session, user)

      if (session.clients.length == 1) {
        user.client = session.clients[0]
      } else {
        router.push('/auth/client_select')
      }

      authFirebase(firebaseAuth, session.firebase_token)
        .then(() => router.push('/dashboard'))
        .catch(console.warn)
    } else {
      router.push('/auth/signin')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <NavBar />
      <Box sx={ui.box}>{children}</Box>
    </FirestoreProvider>
  )
}

export default LayoutBase
