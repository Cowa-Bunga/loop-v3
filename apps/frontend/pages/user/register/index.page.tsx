import axios from 'axios';
import { signIn } from 'next-auth/react';
import {
  Card,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Divider,
} from '@mui/material';

const Register = () => {
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const info = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    };
    axios.post('http://localhost:3333/api/user', info).then((res) => {
      if (res.data) {
        signIn('credentials', {
          email: info.email,
          password: info.password,
        });
      }
    });
  };

  return (
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
            Sign Up
          </Typography>
          <Box component="form" onSubmit={submit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
              Sign Up
            </Button>
          </Box>
        </Card>
      </Container>
    </div>
  );
};

export default Register;
