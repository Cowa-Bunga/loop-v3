import { Map, LayoutBase } from '@components';
import { Stack } from '@mui/material';
import Filter from './components/Filter';
import Drivers from './components/Drivers';
import { useEffect } from 'react';
import {
  collection,
  getDocs,
  query,
  where,
  Firestore
} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { ISessionUser } from '../api/auth/auth.interface';
import { useFirebaseApp, useFirestore } from 'reactfire';
import { Auth } from 'firebase/auth';

const Dashboard = () => {
  const db = useFirestore();
  const firebaseAuth = getAuth(useFirebaseApp());
  const { data, status } = useSession();

  const session: ISessionUser = {
    ...data.user
  } as ISessionUser;

  useEffect(() => {
    if (status === 'authenticated') {
      authFirebase(firebaseAuth, session.firebase_token)
        .then(() => {
          return getData(db, session.client_id);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [session, db]);

  return (
    <LayoutBase>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Filter />
        <Map />
        <Drivers />
      </Stack>
    </LayoutBase>
  );
};

async function authFirebase(firebaseAuth: Auth, token: string) {
  return signInWithCustomToken(firebaseAuth, token);
}

async function getData(db: Firestore, clientId: string) {
  const ordersRef = collection(db, 'clients', clientId, 'orders');
  const ordersQuery = query(ordersRef, where('status', '==', 'pending'));
  const getOrders = await getDocs(ordersQuery);

  console.log(getOrders.docs.map((doc) => doc.data()));
}

export default Dashboard;
