import Map from '../../components/Map';
import Menu from '../../components/Menu';
import Form from '../../components/Form';
import { Stack, Alert, Box, Drawer, TextField } from '@mui/material';

export default () => (
  <>
    <Drawer anchor="left" variant="permanent" open={true}>
      <Box
        sx={{
          textAlign: 'center',
          width: '340px',
          height: '100vh',
          pt: '80px',
          ml: '300px'
        }}
      >
        <Form />
      </Box>
    </Drawer>
    <Menu />

    <Map />
    <Drawer anchor="right" variant="permanent" open={true}>
      <Box
        sx={{
          textAlign: 'center',
          width: '340px',
          height: '100vh',
          pt: '80px',
        }}
      >
        <h4>Driver Activity</h4>
        <Box>
          <TextField
            fullWidth
            size="small"
            placeholder="Search driver name or code"
          />
          <Stack sx={{ mt: 4, width: '100%' }} spacing={2}>
            <Alert severity="warning">Available</Alert>
            <Alert severity="success">Busy</Alert>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  </>
);
