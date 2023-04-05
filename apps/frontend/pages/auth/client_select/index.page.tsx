import { useEffect, useState } from 'react';
import { LayoutSite } from '../../../components';
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
  Alert,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { clientSelectLocalePathBuilder } from '@locale/locale-utils';
import { Select } from '@mui/material';
import { useSession } from 'next-auth/react';
import { ISessionUser } from '../../api/auth/auth.interface';
import { useUserContext } from '../../../context/user_context';

const SignIn = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [state, setState] = useState({
    client_id: '',
    clientSelected: false
  });
  const { data } = useSession();
  const [session, setSession] = useState({ clients: [] } as ISessionUser);
  const user = useUserContext();

  useEffect(() => {
    if (data) {
      setSession({
        ...data.user
      } as ISessionUser);
    }

    if (state.clientSelected) {
      user.client = session.clients.find(
        (client) => client.client_id === state.client_id
      );
      router.push('/dashboard');
    }
  }, [data, state]);
  const { change, submit } = Actions(state, setState);

  return (
    <LayoutSite>
      {router.query.error && (
        <Alert>{t(clientSelectLocalePathBuilder('error'))}</Alert>
      )}

      <div style={ui.loginBg}>
        <Container component="main" maxWidth="xs">
          <Card sx={ui.card}>
            <img
              alt="logo"
              src="https://cb-dos-f5dovyimaq-ew.a.run.app/images/d611b99e56af790000810c1a1f4c5eaf.png"
              style={ui.img}
            />

            <Typography component="h1" variant="h5">
              {t(clientSelectLocalePathBuilder('title'))}
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
                {t(clientSelectLocalePathBuilder('submit'))}
              </Button>
            </Box>
          </Card>
        </Container>
      </div>
    </LayoutSite>
  );
};

export default SignIn;
