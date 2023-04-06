import { Box } from '@mui/material'
import { NavBar } from '@components'
import { useRouter, useSession, useEffect } from '@hooks'
import { FirestoreProvider, useFirebaseApp } from 'reactfire'
import { getFirestore } from 'firebase/firestore'
import { ui } from './style'

const LayoutBase = ({ children }) => {
  const router = useRouter()
  const { status } = useSession()
  const firestoreInstance = getFirestore(useFirebaseApp())

  useEffect(() => {
    console.warn('status', status)
    if (status !== 'authenticated') {
      router.push('/auth/signin')
    }
  }, [router, status])

  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <NavBar />
      <Box sx={ui.box}>{children}</Box>
    </FirestoreProvider>
  )
}

export default LayoutBase
