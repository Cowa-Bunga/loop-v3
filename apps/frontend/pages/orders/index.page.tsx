import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react'
import TabPanel from '../../components/TabPanel';
import { Tabs, Tab, Divider, Box, Typography } from '@mui/material';
import { rows, columns } from './mock';

export function Orders() {
  const [state, setState] = useState({
    tab: 0
  })

  const handleChange = (index) => {
    console.warn(index)
    setState({ ...state, tab: index })
  };

  return (
    <Box sx={{ mt: '70px', p: 4 }}>
      <Box>
        <Typography variant="h6">Orders</Typography>
      </Box>
      <br />
      <Divider />
      <br />
      <Tabs value={state.tab} onChange={i => handleChange(i)}>
        <Tab label="Incomplete" />
        <Tab label="Completed" />
        <Tab label="Abandoned" />
        <Tab label="Unassignable" />
      </Tabs>
      <TabPanel value={state.tab} index={0}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          hideFooter
          density="comfortable"
        />
      </TabPanel>

      <TabPanel value={state.tab} index={1}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          hideFooter
          density="comfortable"
        />
      </TabPanel>

      <TabPanel value={state.tab} index={2}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          hideFooter
          density="comfortable"
        />
      </TabPanel>
    </Box>
  );
}

export default Orders;
