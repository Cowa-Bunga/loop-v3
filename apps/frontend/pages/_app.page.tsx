import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SessionProvider } from 'next-auth/react';
import '../../../libs/i18n/config';
// import { theme } from '@util/lib/mui5';

// light / dark
const theme = createTheme({ palette: { mode: 'light' } });

const LoopApp = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) => {
  return (
    <>
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
    </>
  );
};

export default LoopApp;
