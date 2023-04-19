import { TabPanel } from '@components'
import Actions from './actions'
import { useMergeState } from '@hooks'
import ui from './style'
import {
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tab,
  Tabs,
  TextField
} from '@mui/material'
import { IHub, IRegion } from '@pages/api/me/me.interface'

interface IState {
  tab: number
  hub: string
}

interface IProps {
  regions: IRegion[]
  hubs: IHub[]
  onChange: (e: SelectChangeEvent<string>) => void
  regionHub: string
}

const DashboardFilter = ({ regions, hubs, regionHub, onChange }: IProps) => {
  const [state, setState] = useMergeState<IState>({
    tab: 0,
    hub: ''
  })

  const { tabChange, hubChange } = Actions(state, setState)

  return (
    <Box sx={ui.container}>
      <Box>
        <Select
          variant="outlined"
          fullWidth
          value={regionHub}
          defaultValue={regionHub}
          label="region-hub"
          onChange={onChange}
          sx={ui.select}
        >
          <MenuItem disabled>Hubs</MenuItem>
          {hubs.map((hub) => (
            <MenuItem key={hub.id} value={`h-${hub.id}`}>
              {hub.name}
            </MenuItem>
          ))}
          <MenuItem disabled>Regions</MenuItem>
          {regions.map((region) => (
            <MenuItem key={region.id} value={`r-${region.id}`}>
              {region.name}
            </MenuItem>
          ))}
        </Select>

        <Select
          variant="outlined"
          fullWidth
          value={state.hub}
          defaultValue={state.hub}
          label="hub"
          onChange={hubChange}
          sx={ui.select}
        >
          <MenuItem value={10}>HUB 234</MenuItem>
          <MenuItem value={20}>HUB 456</MenuItem>
        </Select>
      </Box>

      <Box sx={ui.searchBox}>
        <TextField
          sx={ui.search}
          variant="outlined"
          fullWidth
          type="search"
          placeholder="Search order numbers"
        />
      </Box>

      <Tabs value={state.tab} onChange={(e, i) => tabChange(i)}>
        <Tab label="Orders" />
        <Tab label="Clusters" />
        <Tab label="Trips" />
      </Tabs>
      <Divider />
      <TabPanel value={state.tab} index={0}>
        <br />
        <Button variant="outlined">Create Order</Button>
      </TabPanel>
      <TabPanel value={state.tab} index={1}>
        <br />
        clusters
      </TabPanel>
      <TabPanel value={state.tab} index={2}>
        <br />
        Tript
      </TabPanel>
    </Box>
  )
}

export default DashboardFilter
