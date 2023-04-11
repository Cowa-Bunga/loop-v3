import { Box } from '@mui/material';
import NavBar from '../../NavBar';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { getFirestore } from 'firebase/firestore';
import { FirestoreProvider, useFirebaseApp } from 'reactfire';

const LayoutBase = ({ children }) => {
  const router = useRouter();
  const { status } = useSession();
  const firestoreInstance = getFirestore(useFirebaseApp());

  useEffect(() => {
    if (status !== 'authenticated') {
      router.push('/auth/signin');
    }
  }, [router, status]);

  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <Box>
        <NavBar />
        <Box sx={{ pt: '60px' }}>{children}</Box>
      </Box>
    </FirestoreProvider>
  );
};

export default LayoutBase;
