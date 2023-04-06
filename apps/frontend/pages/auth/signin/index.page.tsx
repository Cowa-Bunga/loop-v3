import { LayoutSite, FirebaseHOC } from '@components'
import { authLocalePathBuilder } from '@locale/locale-utils'
import { ISessionUser } from '../../api/auth/auth.interface'
import { authFirebase } from '@util/lib/firebase'
import { useUserContext } from '@context/user_context'
import { getAuth } from 'firebase/auth'
import Actions from './actions'
import ui from './style'
import {
  useRouter,
  useEffect,
  useMergeState,
  useSession,
  useTranslation,
  useFirebaseApp
} from '@hooks'
import {
  Card,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Divider,
  Alert
} from '@mui/material'

const SignIn = () => {
  const router = useRouter()
  const { data, status } = useSession()
  const { t } = useTranslation()
  const user = useUserContext()
  const firebaseAuth = getAuth(useFirebaseApp())

  const [state, setState] = useMergeState({
    email: '',
    password: ''
  })

  useEffect(() => {
    if (status === 'authenticated') {
      const session = { ...data.user } as ISessionUser
      user.firebase_token = session.firebase_token

      if (session.clients.length == 1) {
        user.client = session.clients[0]
      } else {
        router.push('/auth/client_select')
      }

      authFirebase(firebaseAuth, session.firebase_token)
        .then(console.info)
        .then(() => router.push('/dashboard'))
        .catch(console.warn)
    }
  }, [data, firebaseAuth, router, status, user])

  const { change, submit } = Actions(state, setState)

  return (
    <LayoutSite>
      {router.query.error && <Alert>{t(authLocalePathBuilder('error'))}</Alert>}

      <div style={ui.loginBg}>
        <Container component="main" maxWidth="xs">
          <Card sx={ui.card}>
            <img
              alt="logo"
              src="https://cb-dos-f5dovyimaq-ew.a.run.app/images/d611b99e56af790000810c1a1f4c5eaf.png"
              style={ui.img}
            />

            <Typography component="h1" variant="h5">
              {t(authLocalePathBuilder('signIn'))}
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
                    label={t(authLocalePathBuilder('email'))}
                    autoComplete="email"
                    value={state.email}
                    onChange={(e) => change(e.target.value, 'email')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label={t(authLocalePathBuilder('password'))}
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={state.password}
                    onChange={(e) => change(e.target.value, 'password')}
                  />
                </Grid>
              </Grid>
              <br />
              <Divider />
              <Button
                type="submit"
                fullWidth
                size="large"
                variant="outlined"
                sx={ui.btn}
              >
                {t(authLocalePathBuilder('signIn'))}
              </Button>
            </Box>
          </Card>
        </Container>
      </div>
    </LayoutSite>
  )
}

export default FirebaseHOC(SignIn)
