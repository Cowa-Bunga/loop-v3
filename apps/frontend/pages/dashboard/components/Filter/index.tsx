import { TabPanel } from '../../../../components';
import Actions from './actions';
import {
  Select,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Box,
  Drawer,
  Button,
  Divider
} from '@mui/material';
import { useState } from 'react';
import ui from './style';


const DashboardFilter = () => {
  const [state, setState] = useState({
    tab: 0,
    region: '',
    hub: ''
  });

  const { tabChange, regionChange, hubChange } = Actions(state, setState);

  return (
    <Drawer anchor="left" variant="persistent" open={true}>
      <Box sx={ui.container}>
        <Box>
          <Select
            variant="standard"
            fullWidth
            value={state.region}
            label="region"
            placeholder="region"
            onChange={regionChange}
            sx={ui.select}
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
  );
};


export default DashboardFilter;