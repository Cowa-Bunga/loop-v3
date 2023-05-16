import { useMergeState } from '@hooks'
import {
  Box,
  Card,
  Divider,
  Grid,
  TextField,
  Tabs,
  Tab,
  Typography
} from '@mui/material'
import { LayoutBase, TabPanel } from '@components'
import { DataGrid } from '@mui/x-data-grid'
import { rows, columns } from './__test__/mock'
import DriverCard from './components/DriverCard'
import {
  AreaSeries,
  XYPlot,
  HorizontalGridLines,
  XAxis,
  YAxis
} from 'react-vis'

const data = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 1 },
  { x: 3, y: 4 },
  { x: 4, y: 3 },
  { x: 5, y: 7 },
  { x: 6, y: 12 },
  { x: 7, y: 19 },
  { x: 8, y: 25 },
  { x: 9, y: 30 },
  { x: 10, y: 76 },
  { x: 11, y: 88 },
  { x: 12, y: 90 },
  { x: 13, y: 40 },
  { x: 14, y: 40 },
  { x: 15, y: 22 },
  { x: 16, y: 44 },
  { x: 17, y: 100 },
  { x: 18, y: 230 },
  { x: 19, y: 120 },
  { x: 20, y: 130 },
  { x: 21, y: 160 },
  { x: 22, y: 78 },
  { x: 23, y: 0 },
  { x: 24, y: 0 }
]
const DriverProfilePage = () => {
  const [state, setState] = useMergeState({
    tab: 0
  })

  const tabClick = (index: number) => {
    setState({ tab: index })
  }

  return (
    <LayoutBase>
      <Box sx={{ px: 5, py: 5 }}>
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
          <Tabs
            value={state.tab}
            onChange={(_e, v) => tabClick(v)}
            sx={{
              backgroundColor: 'primary.main',
              '& *': { color: 'white !important' }
            }}
          >
            <Tab label="Online" />
            <Tab label="Offline" />
            <Tab label="All" />
            <Tab label="Stats" />
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

          <TabPanel value={state.tab} index={3}>
            <Box>
              <XYPlot
                height={300}
                width={window?.innerWidth - 100}
                style={{ margin: '0 auto' }}
              >
                <HorizontalGridLines />
                <AreaSeries data={data} color="rgba(16,56,99,0.8)" />
                <XAxis title="time" />
                <YAxis />
              </XYPlot>
            </Box>
          </TabPanel>
          <br />
        </Card>
      </Box>
    </LayoutBase>
  )
}

export default DriverProfilePage
