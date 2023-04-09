import { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from '@hooks'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { SessionProvider } from 'next-auth/react'
import { theme } from '@util/lib/mui5'
import { FirebaseAppProvider } from 'reactfire'
import { NoSsr } from '@mui/material'
import { firebaseConfig } from '@util/lib/firebase'
import '@locale/config'
import '../public/cesium/Widgets/widgets.css'
import '../public/app.css'

// hide debugs in prod
if (process.env.NODE_ENV === 'production') {
  console.info = console.log = console.warn = console.error = () => ''
}

const LoopApp = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) => {
  useEffect(() => {
    console.info('app init:', { init: new Date(), session })
  }, [session])

  return (
    <>
      <Head>
        <title>Loop logistics</title>
      </Head>
      <NoSsr>
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <main id="loop-frontend">
              <SessionProvider session={session}>
                <Component {...pageProps} />
              </SessionProvider>
            </main>
          </ThemeProvider>
        </FirebaseAppProvider>
      </NoSsr>
    </>
  )
}

export function getInitialProps() {
  return {}
}

export default LoopApp
