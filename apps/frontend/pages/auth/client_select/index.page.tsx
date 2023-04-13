import { LayoutSite } from '@components'
import Actions from './actions'
import ui from './style'
import { clientSelectLocalePathBuilder } from '@locale/locale-utils'
import { Select } from '@mui/material'
import { useUserContext } from '@context/user'
import {
  useEffect,
  useState,
  useRouter,
  useTranslation,
  useSession
} from '@hooks'
import {
  Card,
  Button,
  Grid,
  Box,
  Typography,
  Container,
  Divider,
  Alert,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material'

const SignIn = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const _t = (path: string) => t(clientSelectLocalePathBuilder(path))

  const [state, setState] = useState({
    client_id: '',
    clientSelected: false
  })
  const { data } = useSession()
  const [session, setSession] = useState({ clients: [] } as ISessionUser)
  const { state: user, update: updateUserContext } = useUserContext()

  useEffect(() => {
    if (data) {
      setSession({
        ...data.user
      } as ISessionUser)
    }

    if (state.clientSelected) {
      updateUserContext({
        client: session.clients.find(
          (client) => client.client_id === state.client_id
        )
      })
      router.push('/map')
    }
  }, [data, router, session?.clients, state, user])

  const { change, submit } = Actions(state, setState)

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
              {_t('title')}
            </Typography>

            <Box component="form" onSubmit={(e) => submit(e)} sx={ui.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="client-select-label">Client</InputLabel>
                    <Select
                      labelId="client-select-label"
                      id="client-select"
                      value={state.client_id}
                      label="client_id"
                      onChange={(e) => change(e, 'client_id')}
                    >
                      {session.clients.map((client) => (
                        <MenuItem
                          key={client.client_id}
                          value={client.client_id}
                        >
                          {client.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                {_t('submit')}
              </Button>
            </Box>
          </Card>
        </Container>
      </div>
    </LayoutSite>
  )
}

export default SignIn
