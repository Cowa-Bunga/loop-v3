import { TabPanel } from '@components'
import Actions from './actions'
import { useMergeState } from '@hooks'
import ui from './style'
import {
  Select,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Box,
  Button,
  Divider,
  SelectChangeEvent
} from '@mui/material'
import { IHub, IRegion } from '@pages/api/me/me.interface'

interface IState {
  tab: number
  regionHub: string
  hub: string
}

interface IProps {
  regions: IRegion[]
  hubs: IHub[]
  onChange: (e: SelectChangeEvent<string>) => void
}

const DashboardFilter = ({ regions, hubs, onChange }: IProps) => {
  const [state, setState] = useMergeState<IState>({
    tab: 0,
    regionHub: '',
    hub: ''
  })

  const { tabChange, hubChange } = Actions(state, setState)

  return (
    <Box sx={ui.container}>
      <Box>
        <Select
          variant="outlined"
          fullWidth
          value={state.regionHub}
          defaultValue={state.regionHub}
          label="region-hub"
          onChange={onChange}
          sx={ui.select}
        >
          <MenuItem disabled>Hubs</MenuItem>
          {hubs.map((hub) => (
            <MenuItem key={hub.id} value={hub.id}>
              {hub.name}
            </MenuItem>
          ))}
          <MenuItem disabled>Regions</MenuItem>
          {regions.map((region) => (
            <MenuItem key={region.id} value={region.id}>
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
        trips
      </TabPanel>
    </Box>
  )
}

export default DashboardFilter
