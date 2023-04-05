import { Map, LayoutBase } from '@components';
import { Stack } from '@mui/material';
import Filter from './components/Filter';
import Drivers from './components/Drivers';
import FirebaseHOC from '../../components/hoc/firebase.hoc';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const Dashboard = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status !== 'authenticated') {
      router.push('/auth/signin');
    }
  }, [status]);

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

export default FirebaseHOC(Dashboard);
