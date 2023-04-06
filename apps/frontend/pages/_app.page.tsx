import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { SessionProvider } from 'next-auth/react'
import { theme } from '@util/lib/mui5'
import { FirebaseAppProvider } from 'reactfire'
import { NoSsr } from '@mui/material'
import { UserWrapper } from '../util/context/user_context'
import '@locale/config'
import { firebaseConfigDev } from '@util/lib/firebase'

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
              <UserWrapper>
                <Component {...pageProps} />
              </UserWrapper>
            </SessionProvider>
          </main>
        </ThemeProvider>
      </FirebaseAppProvider>
    </NoSsr>
  )
}

export default LoopApp

export function getInitialProps() {
  return {}
}
