import { useEffect, useState } from 'react'
import { LayoutSite } from '../../../components'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

import {
  Card,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Divider,
  Alert,
} from '@mui/material'

export default function SignIn() {
  const router = useRouter()
  const { status } = useSession()
  const [state, setState] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/')
    }
  }, [status])

  const change = (e, key) => {
    setState({ ...state, [key]: e.target.value })
  }

  const submit = (e) => {
    e.preventDefault()
    signIn('credentials', {
      callbackUrl: `${window.location.origin}/dashboard`,
      redirect: false,
      email: state.email,
      password: state.password,
    }).then(console.warn)
  }

  return (
    <LayoutSite>
      {router.query.error && (
        <Alert>Could not login. Please check your e-mail or password.</Alert>
      )}

      <div
        style={{
          height: 'calc(100vh - 100px)',
          backgroundImage:
            'url(https://storage.googleapis.com/cb-dev-public-images/dos-icons/login_background.png)',
          backgroundSize: 'cover',
        }}
      >
        <Container component="main" maxWidth="xs">
          <Card
            sx={{
              mt: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 4,
            }}
          >
            <img
              src="https://cb-dos-f5dovyimaq-ew.a.run.app/images/d611b99e56af790000810c1a1f4c5eaf.png"
              style={{ height: '120px' }}
            />

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <Box component="form" onSubmit={(e) => submit(e)} sx={{ mt: 3 }}>
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
                sx={{ mt: 3, mb: 2, p: 1 }}
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
