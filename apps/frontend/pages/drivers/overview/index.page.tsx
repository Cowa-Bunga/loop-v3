import { useMergeState } from '@hooks'
import { Box, Card, Divider, Grid, TextField, Tabs, Tab, Typography } from '@mui/material'
import { LayoutBase, TabPanel } from '@components'
import { DataGrid } from '@mui/x-data-grid'
import { rows, columns } from './__test__/mock'
import DriverCard from './components/DriverCard'
import { AreaSeries, XYPlot, HorizontalGridLines, XAxis, YAxis } from 'react-vis'
import { data } from './mock'
import { ui } from './style'

const DriverProfilePage = () => {
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
            <b>Drivers</b>
          </Typography>
          <br />
        </Box>

        <Divider />
        <br />

        <Box>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <DriverCard title="Vehicle Type" />
            </Grid>
            <Grid item xs={4}>
              <DriverCard title="Driver Statuses" />
            </Grid>
            <Grid item xs={4}>
              <DriverCard title="Driver's active per hub" />
            </Grid>
          </Grid>
        </Box>
        <br />

        <Card sx={{ p: 2 }}>
          <Box>
            <TextField size="small" placeholder="search" />
          </Box>
          <br />
          <Box
            sx={{
              backgroundColor: 'primary.background',
              '& *': { color: 'primary.contrastText' }
            }}
          >
            <Tabs value={state.tab} onChange={(_e, v) => tabClick(v)}>
              <Tab label="Online" />
              <Tab label="Offline" />
              <Tab label="All" />
              <Tab label="Stats" />
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

            <TabPanel value={state.tab} index={3}>
              <Box>
                <XYPlot height={300} width={window?.innerWidth - 100} style={{ margin: '0 auto' }}>
                  <HorizontalGridLines />
                  <AreaSeries data={data} />
                  <XAxis title="time" />
                  <YAxis />
                </XYPlot>
              </Box>
            </TabPanel>
          </Box>

          <br />
        </Card>
      </Box>
    </LayoutBase>
  )
}

export default DriverProfilePage
