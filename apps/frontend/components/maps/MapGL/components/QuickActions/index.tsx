import { Box } from '@mui/material'

export default function QuickActions({ goto, rotate, data }) {
  return (
    <Box
      sx={{
        position: 'fixed',
        width: '100px',
        height: '400px',
        zIndex: 100,
        bottom: 0,
        right: 10,
        overflowY: 'auto',
        textAlign: 'right',
        cursor: 'pointer',
        color: 'skyblue',
        fontSize: '12px'
      }}
    >
      {Object.keys(data).map((c) => (
        <Box
          key={c}
          color="success"
          onClick={(e) => goto(c)}
          sx={{
            '&:hover': {
              textShadow: '0 0 40px silver'
            },
            padding: '10px'
          }}
        >
          {c}
        </Box>
      ))}
      <Box color="warning" onClick={rotate} sx={{ padding: '10px' }}>
        ROTATE
      </Box>
    </Box>
  )
}
