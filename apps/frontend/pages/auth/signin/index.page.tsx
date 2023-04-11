import { LayoutSite } from '@components'
import { authLocalePathBuilder } from '@locale/locale-utils'
import Actions from './actions'
import ui from './style'
import {
  useRouter,
  useEffect,
  useMergeState,
  useSession,
  useTranslation,
  useState
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
import { authFirebase } from '@util/lib/firebase'
import { useUserContext } from '@context/user'
import { getAuth } from 'firebase/auth'
import { useFirebaseApp } from 'reactfire'

const SignIn = () => {
  const [hasInitialised, setHasInitialised] = useState(false)

  const router = useRouter()
  const { t } = useTranslation()
  const userContext = useUserContext()
  const { data, status } = useSession()
  const firebaseAuth = getAuth(useFirebaseApp())
  const _t = (v: string) => t(authLocalePathBuilder(v))

  const [state, setState] = useMergeState({
    email: '',
    password: ''
  })

  const { change, submit } = Actions(state, setState)

  useEffect(() => {
    if (status === 'authenticated' && !hasInitialised) {
      setHasInitialised(true)
      console.warn('firebase init', {
        status,
        hasInitialised,
        userContext,
        data
      })

      const userSession = { ...data.user } as ISessionUser
      userContext.firebase_token = userSession.firebase_token

      if (userSession.clients.length == 1) {
        userContext.client = userSession.clients[0]
        router.push('/map')
      } else {
        router.push('/auth/client_select')
      }

      authFirebase(firebaseAuth, userSession.firebase_token)
    }
  }, [router, status])

  return (
    <LayoutSite>
      {router.query.error && <Alert>{_t('error')}</Alert>}

      <div style={ui.loginBg}>
        <Container component="main" maxWidth="xs">
          <Card sx={ui.card}>
            <img
              alt="logo"
              src="https://cb-dos-f5dovyimaq-ew.a.run.app/images/d611b99e56af790000810c1a1f4c5eaf.png"
              style={ui.img}
            />

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
              <Button
                type="submit"
                fullWidth
                size="large"
                variant="outlined"
                sx={ui.btn}
              >
                {_t('signIn')}
              </Button>
            </Box>
          </Card>
        </Container>
      </div>
    </LayoutSite>
  )
}

export default SignIn
