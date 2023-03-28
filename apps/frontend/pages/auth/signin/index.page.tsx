import { useEffect, useState } from 'react'
import { LayoutSite } from '../../../components'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Actions from './actions'
import ui from './style'
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
  const [state, setState] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/')
    }
  }, [router, status])

  const { change, submit } = Actions(state, setState)

  return (
    <LayoutSite>
      {router.query.error && (
        <Alert>Could not login. Please check your e-mail or password.</Alert>
      )}

      <div style={ui.loginBg}>
        <Container component="main" maxWidth="xs">
          <Card
            sx={ui.card}
          >
            <img
              alt="logo"
              src="https://cb-dos-f5dovyimaq-ew.a.run.app/images/d611b99e56af790000810c1a1f4c5eaf.png"
              style={ui.img}
            />

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <Box component="form" onSubmit={(e) => submit(e)} sx={ui.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={state.email}
                    onChange={(e) => change(e, 'email')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={state.password}
                    onChange={(e) => change(e, 'password')}
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
                Sign In
              </Button>
            </Box>
          </Card>
        </Container>
      </div>
    </LayoutSite>
  )
}

export default SignIn
