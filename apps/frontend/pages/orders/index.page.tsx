import { DataGrid } from '@mui/x-data-grid'
import { useMergeState } from '@hooks'
import { LayoutBase, TabPanel } from '../../components'
import { Tabs, Tab, Divider, Box, Typography } from '@mui/material'
import { rows, columns } from './__test__/mock'

const Orders = () => {
  const [state, setState] = useMergeState({
    tab: 0
  })

  const tabClick = (index: number) => {
    setState({ tab: index })
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
        <Tabs value={state.tab} onChange={(_e, v) => tabClick(v)}>
          <Tab label="Incomplete" />
          <Tab label="Completed" />
          <Tab label="Abandoned" />
          <Tab label="Unassignable" />
        </Tabs>

        <TabPanel value={state.tab} index={state.tab}>
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            hideFooter
            density="comfortable"
          />
        </TabPanel>

        <TabPanel value={state.tab} index={state.tab}>
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            hideFooter
            density="comfortable"
          />
        </TabPanel>

        <TabPanel value={state.tab} index={state.tab}>
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

export default Orders
