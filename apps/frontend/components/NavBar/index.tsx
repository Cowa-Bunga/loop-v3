import { IconButton, AppBar, Box, Toolbar, Typography } from '@mui/material'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useMergeState } from '@hooks'
import { Menu, LockOpen, Lock } from '@mui/icons-material'

export default function NavBar({ open, setOpen }) {
  const { data: session } = useSession()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'primary.main',
          zIndex: 10000
        }}
      >
        <Toolbar>
          {session && (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                onClick={() => setOpen({ open: !open })}
              >
                <Menu />
              </IconButton>
            </>
          )}

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: 'block', textAlign: 'center' }}
          >
            <img
              alt="logo"
              style={{ marginTop: '5px', height: '20px' }}
              src="https://www.loop.co.za/wp-content/uploads/2021/12/Logo.svg"
            />
          </Typography>

          <IconButton
            color="inherit"
            onClick={() =>
              !session
                ? signIn()
                : signOut({ callbackUrl: '/auth/signin', redirect: true })
            }
          >
            {!session ? <Lock /> : <LockOpen />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
