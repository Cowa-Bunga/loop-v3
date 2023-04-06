import { LayoutSite } from '@components'
import { authLocalePathBuilder } from '@locale/locale-utils'
import Actions from './actions'
import ui from './style'
import {
  useRouter,
  useEffect,
  useMergeState,
  useSession,
  useTranslation
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
  const { status } = useSession()
  const { t } = useTranslation()
  const _t = (v: string) => t(authLocalePathBuilder(v))

  const [state, setState] = useMergeState({
    email: '',
    password: ''
  })

  const { change, submit } = Actions(state, setState)

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard')
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
