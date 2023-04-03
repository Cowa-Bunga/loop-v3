import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SessionProvider } from 'next-auth/react';
import '@locale/config';
import { theme } from '@util/lib/mui5';
import { FirebaseAppProvider } from 'reactfire';
import { NoSsr } from '@mui/material';

const firebaseConfigDev = {
  apiKey: 'AIzaSyCgiluwpE3dNxGLL_iAPaV4SKZDTm_tpME',
  authDomain: 'cb-dev-298308.firebaseapp.com',
  projectId: 'cb-dev-298308',
  storageBucket: 'cb-dev-298308.appspot.com',
  messagingSenderId: '997363095290',
  appId: '1:997363095290:web:ac9608e141fa8ad93ddb43',
  measurementId: 'G-3P6K67GJB2',
  experimentalForceLongPolling: true
};

const LoopApp = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) => {
  return (
    <NoSsr>
      <FirebaseAppProvider firebaseConfig={firebaseConfigDev}>
        <Head>
          <title>Loop</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <main className="app">
            <SessionProvider session={session}>
              <Component {...pageProps} />
            </SessionProvider>
          </main>
        </ThemeProvider>
      </FirebaseAppProvider>
    </NoSsr>
  );
};

export default LoopApp;

export const getServerSideProps = async () => {
  return null;
};
