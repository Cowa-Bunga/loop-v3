import { useEffect, useState } from 'react';
import { LayoutSite } from '../../../components';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Actions from './actions';
import ui from './style';
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
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { authLocalePathBuilder } from '@locale/locale-utils';
import { Auth, getAuth, signInWithCustomToken } from 'firebase/auth';
import { ISessionUser } from '../../api/auth/auth.interface';
import { useFirebaseApp } from 'reactfire';

const SignIn = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data, status } = useSession();
  const firebaseAuth = getAuth(useFirebaseApp());
  const [state, setState] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    // form session we will determine users client count
    // if greater than 1 navigate to select client page
    if (status === 'authenticated') {
      const session: ISessionUser = {
        ...data.user
      } as ISessionUser;

      authFirebase(firebaseAuth, session.firebase_token).then(() =>
        router.push('/')
      );
    }
  }, [router, status]);

  const { change, submit } = Actions(state, setState);

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
                    label={t(authLocalePathBuilder('email'))}
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
                    label={t(authLocalePathBuilder('password'))}
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
                {t(authLocalePathBuilder('signIn'))}
              </Button>
            </Box>
          </Card>
        </Container>
      </div>
    </LayoutSite>
  );
};

async function authFirebase(firebaseAuth: Auth, token: string) {
  return signInWithCustomToken(firebaseAuth, token);
}

export default SignIn;
