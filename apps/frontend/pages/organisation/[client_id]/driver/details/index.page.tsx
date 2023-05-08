import { Box, Card, Container, Grid, TextField } from '@mui/material'
import { LayoutBase } from '@components'
import { DataGrid } from '@mui/x-data-grid'
import { rows, columns } from './__test__/mock'
import DriverCard from './components/DriverCard'

const DriverProfilePage = () => {
  return (
    <LayoutBase>
      <br />
      <br />
      <Container>
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
        <Card sx={{ p: 2}}>
          <Box>
            <TextField placeholder="search" />
          </Box>
          <br />
          <Box>
            <DataGrid
              rows={rows}
              columns={columns}
              autoHeight
              hideFooter
              density="comfortable"
            />
          </Box>
        </Card>
      </Container>
    </LayoutBase>
  )
}

export default DriverProfilePage
