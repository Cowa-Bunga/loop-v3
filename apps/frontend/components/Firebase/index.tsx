import { useRouter, useSession, useEffect, useState } from '@hooks'
import { FirestoreProvider, useFirebaseApp } from 'reactfire'
import { getFirestore } from 'firebase/firestore'
import { authFirebase } from '@util/lib/firebase'
import { useUserContext } from '@context/user'
import { getAuth } from 'firebase/auth'
import { router } from 'next/client'

export default function FirebaseWrapper({ children }) {
  const firestoreInstance = getFirestore(useFirebaseApp())
  const { status } = useSession()

  useEffect(() => {
    if (status !== 'authenticated') {
      router.push('/').then((r) => console.log(r))
    }
  }, [status])

  return (
    <FirestoreProvider sdk={firestoreInstance}>{children}</FirestoreProvider>
  )
}
