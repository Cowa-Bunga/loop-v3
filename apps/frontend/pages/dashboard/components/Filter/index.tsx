import { TabPanel } from '../../../../components'
import {
  Select,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Box,
  Drawer,
  Button,
  Divider,
} from '@mui/material'
import { useState } from 'react'

export default function DashboardFilter() {
  const [state, setState] = useState({
    tab: 0,
    region: '',
    hub: '',
  })

  const tabChange = (index) => {
    setState({ ...state, tab: index })
  }

  const regionChange = (e) => {
    setState({ ...state, region: e.target.value })
  }

  const hubChange = (e) => {
    setState({ ...state, hub: e.target.value })
  }

  return (
    <Drawer anchor="left" variant="permanent">
      <Box
        sx={{
          textAlign: 'center',
          width: '370px',
          height: '100vh',
          pt: '80px',
          px: 2,
        }}
      >
        <Box>
          <Select
            variant="standard"
            fullWidth
            value={state.region}
            label="region"
            placeholder="region"
            onChange={regionChange}
            sx={{ height: '40px', my: 1 }}
          >
            <MenuItem value={10}>Western Cape</MenuItem>
            <MenuItem value={20}>Limpopo</MenuItem>
          </Select>

          <Select
            variant="standard"
            fullWidth
            value={state.hub}
            label="hub"
            onChange={hubChange}
            sx={{ height: '40px', my: 1 }}
          >
            <MenuItem value={10}>HUB 234</MenuItem>
            <MenuItem value={20}>HUB 456</MenuItem>
          </Select>
        </Box>

        <Box sx={{ my: 1 }}>
          <TextField
            sx={{ height: '50px', my: 1 }}
            variant="outlined"
            fullWidth
            type="search"
            placeholder="Search order numbers"
          />
        </Box>

        <Tabs value={state.tab} onChange={(i) => tabChange(i)}>
          <Tab label="Orders" />
          <Tab label="Open Clusters" />
          <Tab label="Trips" />
        </Tabs>
        <Divider />
        <TabPanel value={state.tab} index={0}>
          <Button variant="outlined">Create Order</Button>
        </TabPanel>
        <TabPanel value={state.tab} index={1}>
          clusters
        </TabPanel>
        <TabPanel value={state.tab} index={2}>
          trips
        </TabPanel>
      </Box>
    </Drawer>
  )
}
