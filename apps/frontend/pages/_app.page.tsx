import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { SessionProvider } from 'next-auth/react'
import { useMergeState, useContext } from '@hooks'
import { theme } from '@util/lib/mui5'

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
  )
}

export default LoopApp
