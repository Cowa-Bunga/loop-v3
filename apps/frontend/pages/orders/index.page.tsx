import { DataGrid } from '@mui/x-data-grid'
import { useState } from 'react'
import { LayoutBase, TabPanel } from '../../components'
import { Tabs, Tab, Divider, Box, Typography } from '@mui/material'
//TODO:
import { rows, columns } from './mock'

export default function Orders() {
  const [state, setState] = useState({
    tab: 0,
  })

  const tabClick = (index) => {
    console.warn(index)
    setState({ ...state, tab: index })
  }

  return (
    <LayoutBase>
      <Box sx={{ p: 5 }}>
        <Box>
          <Typography variant="h6">Orders</Typography>
        </Box>
        <br />
        <Divider />
        <br />
        <Tabs value={state.tab} onChange={(i) => tabClick(i)}>
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
    </LayoutBase>
  )
}
