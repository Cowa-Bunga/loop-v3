import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Icon } from '@mui/material'
import { useRouter } from '@hooks'
import { MODEL_MENU } from './model_dos'
import ui from './style'
import {
  MenuList,
  MenuItem,
  Box,
  Drawer,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'

export default function Menu({ open, setOpen }: IMenuProps) {
  const router = useRouter()

  const goto = (url: string) => {
    router.push(url)
  }

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={open}
      sx={{ zIndex: 10000 }}
      onClose={(e) => setOpen(false)}
    >
      <Box sx={ui.container}>
        <MenuList sx={ui.menuList}>
          {MODEL_MENU({ client_id: 'todo-id' }).map((item: IMenu) =>
            item.children ? (
              <MenuItem key={item.title}>
                <Accordion sx={ui.accordion} disableGutters square>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                  >
                    <Icon sx={ui.homeIconDropdown}>
                      <item.icon />
                    </Icon>
                    {item.title}
                  </AccordionSummary>

                  <AccordionDetails>
                    <MenuList sx={ui.menuList}>
                      {item.children.map((child) => (
                        <MenuItem
                          key={child.id}
                          sx={ui.menuItem}
                          onClick={() => goto(child.link)}
                        >
                          <Icon sx={{ ...ui.homeIcon, ...ui.homeIconInner }}>
                            <child.icon />
                          </Icon>
                          {child.title}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </AccordionDetails>
                </Accordion>
              </MenuItem>
            ) : (
              <MenuItem
                key={item.id}
                sx={ui.menuItem}
                onClick={() => goto(item.link)}
              >
                <Icon sx={ui.homeIcon}>
                  <item.icon />
                </Icon>
                {item.title}
              </MenuItem>
            )
          )}

          <Box sx={ui.menuBottom}>
            <Box sx={ui.version}>&copy; loop-pro: v1.0</Box>
          </Box>
        </MenuList>
      </Box>
    </Drawer>
  )
}
