// import Actions from './actions'
import ui from './style'
import { DataGrid } from '@mui/x-data-grid'
import { tripColumns, tripRows } from './mock'
import { ExpandMore, Add, Tune } from '@mui/icons-material'
import {
  Box,
  Accordion,
  AccordionDetails,
  Typography,
  IconButton,
  AccordionSummary,
  TextField,
  CircularProgress,
  Paper,
  Fab,
  Button
} from '@mui/material'

export default function DashboardFilter() {
  return (
    <Box sx={ui.container}>
      {/* <Paper sx={{ p: 2 }}>
        {[1, 2, 3, 4].map((l) => (
          <>
            <Box key={l} sx={{ position: 'relative', display: 'inline-flex', mx: 2 }}>
              <CircularProgress
                color="info"
                variant="determinate"
                value={l * 25}
                size={90}
                thickness={6}
                title="Orders"
              />

              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Fab color="primary" size="large" sx={{ fontColor: 'white' }}>
                  <Typography variant="caption" component="div">{`${Math.round(l * 25)}%`}</Typography>
                </Fab>
              </Box>
            </Box>
          </>
        ))}
      </Paper> */}
      <Paper>
        <Button fullWidth color="primary">
          HUBS/Regions
        </Button>
      </Paper>

      <br />

      {['Trips', 'Tasks'].map((v, i) => (
        <Accordion square key={v} expanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box>
              <Fab size="small" color="primary">
                <Add />
              </Fab>
            </Box>
            <Box>
              <Typography sx={{ lineHeight: '34px', ml: '20px', width: '100px' }}>
                <b>{v.toUpperCase()}</b>
              </Typography>
            </Box>
            <Box>
              <IconButton size="small">
                <Tune />
              </IconButton>
            </Box>
            <Box sx={{ ml: 4, mr: '20px', mt: -0.5 }}>
              <TextField size="small" variant="outlined" placeholder="enter Task/Customer" label="search" />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <DataGrid
              rows={tripRows}
              columns={tripColumns}
              autoHeight
              density="compact"
              checkboxSelection
              loading={false}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}
