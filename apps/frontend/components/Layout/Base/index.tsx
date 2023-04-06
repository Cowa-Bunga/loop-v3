import { Box } from '@mui/material';
import NavBar from '../../NavBar';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import FirebaseHOC from '../../hoc/firebase.hoc';

const LayoutBase = ({ children }) => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    console.warn('status', status);
    if (status !== 'authenticated') {
      router.push('/auth/signin');
    }
  }, [router, status]);

  return (
    <Box>
      <NavBar />
      <Box sx={{ pt: '60px' }}>{children}</Box>
    </Box>
  );
};

export default FirebaseHOC(LayoutBase);
