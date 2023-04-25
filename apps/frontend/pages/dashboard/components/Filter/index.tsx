// import Actions from './actions'
// import { useMergeState } from '@hooks'
import ui from './style'
import { DataGrid } from '@mui/x-data-grid'
import { tripColumns, tripRows } from './mock'
import { ExpandMore, Add, Tune } from '@mui/icons-material'
import { useSession } from 'next-auth/react'
import {
  Box,
  Accordion,
  AccordionDetails,
  Typography,
  IconButton,
  AccordionSummary,
  TextField
} from '@mui/material'
export default function DashboardFilter({
  regions,
  hubs,
  regionHub
}: IappDashboardFilterProps) {
  const { data: session } = useSession()
  console.warn(session)
  // const [state, setState] = useMergeState<IappDashboardFilterState>({
  //   tab: 0,
  //   hub: ''
  // })

  // const { tabChange, hubChange } = Actions(state, setState)

  return (
    <Box sx={ui.container}>
      {['Regions', 'Hubs', 'Tasks', 'Trips'].map((v) => (
        <Accordion square key={v}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box>
              <Typography
                sx={{ lineHeight: '34px', mr: '20px', width: '100px' }}
              >
                <b>{v.toUpperCase()}</b>
              </Typography>
            </Box>
            <Box>
              <IconButton size="small">
                <Add />
              </IconButton>
            </Box>
            <Box sx={{ ml: 4, mr: '20px' }}>
              <TextField
                size="small"
                variant="outlined"
                placeholder="enter Task/Customer"
                label="search"
              />
            </Box>
            <Box>
              <IconButton size="small">
                <Tune />
              </IconButton>
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
