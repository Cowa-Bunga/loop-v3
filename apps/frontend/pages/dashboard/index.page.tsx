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
import { ISessionUser } from '../api/auth/auth.interface';
import { useFirestore } from 'reactfire';

const Dashboard = () => {
  const db = useFirestore();
  const { data } = useSession();

  useEffect(() => {
    const session = {
      ...data.user
    } as ISessionUser;

    getData(db, session.client_id);
  }, []);

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

async function getData(db: Firestore, clientId: string) {
  const ordersRef = collection(db, 'clients', clientId, 'orders');
  const ordersQuery = query(ordersRef, where('status', '==', 'pending'));
  const getOrders = await getDocs(ordersQuery);

  console.log(getOrders.docs.map((doc) => doc.data()));
}

export default Dashboard;
