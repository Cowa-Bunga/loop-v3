import { MenuList, MenuItem, Box, Drawer } from '@mui/material';
import { useSession, signOut } from 'next-auth/react';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/router';
import { menuBottomModel, menuModel } from './model';
import ui from './style';

export default function NavBar() {
  const { data: session } = useSession();
  const router = useRouter();

  const goto = (url: string) => {
    router.push(url);
  };

  return (
    <Drawer variant="permanent" anchor="left">
      <Box sx={ui.container}>
        <MenuList sx={ui.menuList}>
          {menuModel.map((item) => (
            <MenuItem sx={{ height: '50px' }} onClick={() => goto(item.link)}>
              <HomeIcon sx={{ mx: 1 }} />
              {item.title}
            </MenuItem>
          ))}
          <div style={{ position: 'fixed', bottom: 0, width: 300 }}>
            {menuBottomModel.map((item) => (
              <MenuItem sx={{ height: '50px' }} onClick={() => goto(item.link)}>
                <HomeIcon sx={{ mx: 1 }} />
                {item.title}
              </MenuItem>
            ))}
            <div
              style={{
                fontSize: '8px',
                textAlign: 'center',
                margin: '40px 0 10px 0',
              }}
            >
              version: 3.1.0
            </div>
          </div>
        </MenuList>
      </Box>
    </Drawer>
  );
}
