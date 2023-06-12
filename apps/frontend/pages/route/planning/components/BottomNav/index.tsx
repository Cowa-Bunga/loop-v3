import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material'
import { Restore as RestoreIcon, Route as RouteIcon, LocationOn as LocationOnIcon } from '@mui/icons-material'
import { useState } from '@hooks'
import { ui } from './style'

export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0)

  return (
    <Box sx={ui.container}>
      <BottomNavigation
        showLabels
        value={value}
        sx={ui.nav}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
      >
        <BottomNavigationAction sx={ui.action} label="Trip" icon={<RouteIcon />} />
        <BottomNavigationAction sx={ui.action} label="History" icon={<RestoreIcon />} />
        <BottomNavigationAction sx={ui.action} label="Zones" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </Box>
  )
}
