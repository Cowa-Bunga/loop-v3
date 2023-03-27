import { MenuList, MenuItem, Box, Drawer } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import { useRouter } from 'next/router'
import { menuBottomModel, menuModel } from './model'
import ui from './style'

export default function Menu({ open }) {
  const router = useRouter()

  const goto = (url: string) => {
    router.push(url)
  }

  return (
    <Drawer variant="temporary" anchor="left" hideBackdrop open={open}>
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
            <Box sx={ui.version}>version: 3.1.0</Box>
          </div>
        </MenuList>
      </Box>
    </Drawer>
  )
}
