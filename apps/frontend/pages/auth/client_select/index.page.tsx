import { LayoutSite } from '@components'
import Actions from './actions'
import ui from './style'
import { useUserContext } from '@context/user'
import { clientSelectLocalePathBuilder } from '@locale/locale-utils'
import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Typography
} from '@mui/material'
import {
  useEffect,
  useMergeState,
  useRouter,
  useSession,
  useTranslation
} from '@hooks'

const SignIn = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const _t = (path: string) => t(clientSelectLocalePathBuilder(path))

  const [state, setState] = useMergeState({
    client_id: '',
    clientSelected: false,
    clients: [],
    authenticating: false
  })
  const { data, status } = useSession()
  const { update: updateUserContext } = useUserContext()

  useEffect(() => {
    if (data && status === 'authenticated') {
      setState({
        ...state,
        clients: (data.user as ISessionUser).clients
      })
    }

    if (state.clientSelected) {
      updateUserContext({
        client: state.clients.find(
          (client) => client.client_id === state.client_id
        )
      })
      router.push('/dashboard')
    }
  }, [data, state.clientSelected])

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
                      data-testid="client-select"
                      value={state.client_id}
                      label="client_id"
                      onChange={(e) => change(e, 'client_id')}
                    >
                      {state.clients.map((client) => {
                        return (
                          <MenuItem
                            key={client.client_id}
                            value={client.client_id}
                            data-testid={`client-select-option-${client.client_id}`}
                          >
                            {client.name}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <br />
              <Divider />
              {state.authenticating ? (
                <LinearProgress />
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  size="large"
                  variant="outlined"
                  sx={ui.btn}
                >
                  {_t('submit')}
                </Button>
              )}
            </Box>
          </Card>
        </Container>
      </div>
    </LayoutSite>
  )
}

export default SignIn
