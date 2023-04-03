import { Map, LayoutBase } from '@components';
import { Stack } from '@mui/material';
import Filter from './components/Filter';
import Drivers from './components/Drivers';
import { useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { db, firebaseAuth } from '../_app.page';
import { signInWithCustomToken } from 'firebase/auth';
import { ISessionUser } from '../api/auth/auth.interface';

const Dashboard = () => {
  const { data, status } = useSession();

  const session: ISessionUser = {
    ...data.user
  } as ISessionUser;

  useEffect(() => {
    if (status === 'authenticated') {
      authFirebase(session.firebase_token)
        .then(() => {
          return getData(session.client_id);
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

async function authFirebase(token: string) {
  return signInWithCustomToken(firebaseAuth, token);
}

async function getData(clientId: string) {
  const ordersRef = collection(db, 'clients', clientId, 'orders');
  const ordersQuery = query(ordersRef, where('status', '==', 'pending'));
  const getOrders = await getDocs(ordersQuery);

  console.log(getOrders.docs.map((doc) => doc.data()));
}

export default Dashboard;
