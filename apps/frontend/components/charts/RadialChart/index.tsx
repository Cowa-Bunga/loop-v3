import { Box } from '@mui/material'
import { XYPlot, XAxis, YAxis, MarkSeries, CircularGridLines } from 'react-vis'

// TODO: mocked data, componentise.
const data = [
  { r: 1, theta: Math.PI / 3, size: 30 },
  { r: 1.7, theta: (2 * Math.PI) / 3, size: 10 },
  { r: 2, theta: Math.PI, size: 1 },
  { r: 3, theta: (3 * Math.PI) / 2, size: 12 },
  { r: 2.5, theta: Math.PI / 4, size: 4 },
  { r: 0, theta: Math.PI / 4, size: 1 }
]

const margin = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}

const WIDTH = 200
const HEIGHT = 200

export default function DistanceChart() {
  return (
    <Box
      sx={{
        borderRadius: '50%',
        height: HEIGHT,
        width: WIDTH,
        margin: '40px auto 0 auto'
      }}
    >
      <XYPlot margin={margin} xDomain={[-3, 3]} yDomain={[-3, 3]} width={WIDTH} height={HEIGHT}>
        <CircularGridLines />
        <XAxis top={(HEIGHT - margin.top) / 2} />
        <YAxis left={(WIDTH - margin.left - margin.right) / 2} />
        <MarkSeries
          strokeWidth={10}
          color="rgb(16,58,99)"
          sizeRange={[1, 10]}
          data={data.map((row) => ({
            ...row,
            x: Math.cos(row.theta) * row.r,
            y: Math.sin(row.theta) * row.r
          }))}
        />
      </XYPlot>
    </Box>
  )
}
