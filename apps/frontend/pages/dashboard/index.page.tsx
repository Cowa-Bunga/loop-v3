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
  const session = useSession();
  useEffect(() => {
    console.log('I should be getting data');
    console.log(session.data);
    if (session.data) {
      console.log('I am getting data');
      getData(session.data.client_id);
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
  const ordersRef = collection(db, 'clients', '51GgLzzTLXz37UGDoaj9', 'orders');
  const ordersQuery = query(ordersRef, where('status', '==', 'pending'));
  const getOrders = await getDocs(ordersQuery);

  console.log(getOrders.docs.map((doc) => doc.data()));
}

export default Dashboard;
