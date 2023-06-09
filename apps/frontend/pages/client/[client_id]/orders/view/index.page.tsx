import { DataGrid } from '@mui/x-data-grid'
import { useMergeState } from '@hooks'
import { LayoutBase, TabPanel } from '@components'
import { Tabs, Tab, Divider, Box, Typography } from '@mui/material'
import { rows, columns } from './__test__/mock'
import { LineChart } from '@components'
import { ui } from './style'

const Orders = () => {
  const [state, setState] = useMergeState({
    tab: 0
  })

  const tabClick = (index: number) => {
    setState({ tab: index })
  }

  return (
    <LayoutBase>
      <Box sx={ui.container}>
        <Box>
          <Typography variant="h5">
            <b>Orders</b>
          </Typography>
          <br />
        </Box>

        <Divider />
        <br />

        <LineChart />
        <br />

        <Tabs value={state.tab} onChange={(_e, v) => tabClick(v)}>
          <Tab label="Incomplete" />
          <Tab label="Completed" />
          <Tab label="Abandoned" />
          <Tab label="Unassignable" />
        </Tabs>

        <TabPanel value={state.tab} index={0}>
          <DataGrid rows={rows} columns={columns} autoHeight hideFooter density="comfortable" />
        </TabPanel>

        <TabPanel value={state.tab} index={1}>
          <DataGrid rows={rows} columns={columns} autoHeight hideFooter density="comfortable" />
        </TabPanel>

        <TabPanel value={state.tab} index={2}>
          <DataGrid rows={rows} columns={columns} autoHeight hideFooter density="comfortable" />
        </TabPanel>
      </Box>
    </LayoutBase>
  )
}

export default Orders
