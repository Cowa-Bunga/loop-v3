import Dashboard from './dashboard/index.page';
import { useSession } from 'next-auth/react';
import SignIn from './auth/signin/index.page';
import { FirestoreProvider, useFirebaseApp } from 'reactfire';
import { getFirestore } from 'firebase/firestore';

export function LoopFrontend() {
  const { data: session } = useSession();
  const firestoreInstance = getFirestore(useFirebaseApp());
  return (
    <FirestoreProvider sdk={firestoreInstance}>
      {session ? <Dashboard /> : <SignIn />}
    </FirestoreProvider>
  );
}

export default LoopFrontend;
