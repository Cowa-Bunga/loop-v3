import { Map, LayoutBase } from '@components';
import { Stack } from '@mui/material';
import Filter from './components/Filter';
import Drivers from './components/Drivers';
import { useEffect } from 'react';
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
  Firestore
} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { db } from '../_app.page';

const Dashboard = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      // getData(session.user.client_id);
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

async function getData(clientId: string) {
  console.log(typeof db);
  const ordersRef = collection(db, 'clients', 'ayce3l5n0QSA7FO7CDtr', 'orders');
  const ordersQuery = query(ordersRef, where('status', '==', 'pending'));
  const getOrders = await getDocs(ordersQuery);

  console.log(getOrders.docs.map((doc) => doc.data()));
}

export default Dashboard;
