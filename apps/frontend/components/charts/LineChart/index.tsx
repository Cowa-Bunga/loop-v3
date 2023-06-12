import { Box } from '@mui/material'
import { AreaSeries, XYPlot, HorizontalGridLines, XAxis, YAxis } from 'react-vis'

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

export default function OrdersChart() {
  return (
    <Box>
      <XYPlot height={300} width={window?.innerWidth - 100} style={{ margin: '0 auto' }}>
        <HorizontalGridLines />
        <AreaSeries data={data} color={'rgba(216,0,299,0.8)' || 'rgba(16,56,99,0.8)'} />
        <XAxis title="time" />
        <YAxis />
      </XYPlot>
    </Box>
  )
}
