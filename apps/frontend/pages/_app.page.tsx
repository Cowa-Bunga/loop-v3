import { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from '@hooks'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { SessionProvider } from 'next-auth/react'
import { theme } from '@util/lib/mui5'
import { NoSsr } from '@mui/material'
import { FirebaseAppProvider, firebaseConfig } from '@util/lib/firebase'
import '@locale/config'
import '../public/app.css'
import 'reactflow/dist/style.css'
import { getServerSession, NextAuthOptions } from 'next-auth'
import { authOptions } from '@pages/api/auth/[...nextauth].page'
import { UserWrapper } from '@context/user'
import { PermissionsProvider } from '@util/rules/permissions'

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
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <main id="loop-frontend">
            <FirebaseAppProvider firebaseConfig={firebaseConfig}>
              <SessionProvider session={session}>
                <UserWrapper>
                  <PermissionsProvider>
                    <Component {...pageProps} />
                  </PermissionsProvider>
                </UserWrapper>
              </SessionProvider>
            </FirebaseAppProvider>
          </main>
        </ThemeProvider>
      </NoSsr>
    </>
  )
}

export async function getInitialProps() {
  return {}
}

export async function getServerSideProps(context) {
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions as NextAuthOptions
  )

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}

export default LoopApp
