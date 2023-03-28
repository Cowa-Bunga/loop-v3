import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { SessionProvider } from 'next-auth/react'

// light / dark
const darkTheme = createTheme({ palette: { mode: 'light' } })

function LoopApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <title>Loop</title>
      </Head>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <main className="app">
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
        </main>
      </ThemeProvider>
    </>
  );
}

export default LoopApp
