import { MenuList, MenuItem, Box, Drawer } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import { useRouter } from '@hooks'
import { MODEL_MENU } from './model'
import ui from './style'

export default function Menu({ open }: { open: boolean }) {
  const router = useRouter()

  const goto = (url: string) => {
    router.push(url)
  }

  return (
    <Drawer variant="temporary" anchor="left" hideBackdrop open={open}>
      <Box sx={ui.container}>
        <MenuList sx={ui.menuList}>
          {MODEL_MENU({ client_id: 'todo-id' }).map((item) => (
            <MenuItem
              key={item.id}
              sx={ui.menuItem}
              onClick={() => goto(item.link)}
            >
              <HomeIcon sx={ui.homeIcon} />
              {item.title}
            </MenuItem>
          ))}

          <Box sx={ui.menuBottom}>
            <Box sx={ui.version}>version: 0.1</Box>
          </Box>
        </MenuList>
      </Box>
    </Drawer>
  )
}
