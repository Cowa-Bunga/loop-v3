import { LayoutSite } from '../../../components';
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
import Actions from './actions';
import ui from './style';

const Register = () => {
  const { submit } = Actions();

  return (
    <LayoutSite>
      <div style={ui.container}>
        <Container component="main" maxWidth="xs">
          <Card sx={ui.card}>
            <img
              alt="logo"
              src="https://cb-dos-f5dovyimaq-ew.a.run.app/images/d611b99e56af790000810c1a1f4c5eaf.png"
              style={{ height: '120px' }}
            />

            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>

            <Box component="form" onSubmit={submit} sx={ui.form}>
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
                sx={ui.btn}
              >
                Sign Up
              </Button>
            </Box>
          </Card>
        </Container>
      </div>
    </LayoutSite>
  );
};

export default Register;
