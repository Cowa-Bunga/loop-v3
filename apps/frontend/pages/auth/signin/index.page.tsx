import { LayoutSite } from '@components'
import { authLocalePathBuilder } from '@locale/locale-utils'
import { authFirebase } from '@util/lib/firebase'
import { useUserContext } from '@context/user'
import { getAuth } from 'firebase/auth'
import { useFirebaseApp } from 'reactfire'
import Actions from './actions'
import ui from './style'
import { useEffect, useMergeState, useRouter, useSession, useState, useTranslation } from '@hooks'
import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  LinearProgress,
  TextField,
  Typography
} from '@mui/material'

const SignIn = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const { state: userContext, update: updateUserContext } = useUserContext()
  const { data, status } = useSession()
  const firebaseAuth = getAuth(useFirebaseApp())
  const _t = (v: string) => t(authLocalePathBuilder(v))

  const [hasInitialised, setHasInitialised] = useState(false)

  const [state, setState] = useMergeState({
    email: '',
    password: '',
    authenticating: false
  })

  const { getUser, change, submit } = Actions(state, setState)

  useEffect(() => {
    if (status === 'authenticated' && !hasInitialised) {
      setHasInitialised(true)
      console.info('firebase init', {
        status,
        hasInitialised,
        userContext,
        data
      })

      const userSession = { ...data.user } as ISessionUser

      authFirebase(firebaseAuth, userSession.firebase_token)
      getUser(userSession.clients[0], updateUserContext)

      if (userSession.clients.length == 1) {
        router.push('/dashboard')
      } else {
        router.push('/auth/client_select')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, hasInitialised, status, userContext])

  return (
    <LayoutSite>
      <Box sx={ui.root}>
        {router.query.error && <Alert>{_t('error')}</Alert>}

        <div style={ui.loginBg}>
          <Container component="main" maxWidth="xs">
            <Card sx={ui.card}>
              <img alt="logo" src="/loop-log-icon.png" style={ui.img} />

              <Typography component="h1" variant="h5">
                {_t('signIn')}
              </Typography>

              <Box component="form" onSubmit={(e) => submit(e)} sx={ui.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      name="email"
                      type="email"
                      label={_t('email')}
                      autoComplete="email"
                      value={state.email}
                      onChange={(e) => change('email', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label={_t('password')}
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={state.password}
                      onChange={(e) => change('password', e.target.value)}
                    />
                  </Grid>
                </Grid>
                <br />
                <Divider />
                {state.authenticating ? (
                  <LinearProgress />
                ) : (
                  <Button type="submit" fullWidth size="large" variant="outlined" sx={ui.btn}>
                    {_t('signIn')}
                  </Button>
                )}
              </Box>
            </Card>
          </Container>
        </div>
      </Box>
    </LayoutSite>
  )
}

export default SignIn
