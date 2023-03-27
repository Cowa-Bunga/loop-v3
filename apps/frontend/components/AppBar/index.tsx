import {
  IconButton,
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import { Menu, LockOpen, Lock } from '@mui/icons-material';
import MenuDrawer from '../Menu';


export default function NavBar() {
  const { data: session } = useSession();
  const [state, setState] = useState({
    open: false
  })

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: 10000, backgroundColor: '#063863' }}
      >
        <Toolbar>
          {session && (
            <IconButton size="large" edge="start" color="inherit" onClick={() => setState({ open: !state.open })}>
              <Menu />
              <MenuDrawer open={state.open}/>
            </IconButton>
          )}

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: 'block', textAlign: 'center' }}
          >
            <img
              style={{ marginTop: '5px', height: '20px' }}
              src="https://www.loop.co.za/wp-content/uploads/2021/12/Logo.svg"
            />
          </Typography>

          <IconButton
            color="inherit"
            onClick={() => (!session ? signIn() : signOut())}
          >
            {!session ? <Lock /> : <LockOpen />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
