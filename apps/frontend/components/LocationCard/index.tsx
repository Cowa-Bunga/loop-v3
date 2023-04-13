import { Card, Typography } from '@mui/material'
import theme from '@util/lib/mui5'
import {
  Sms,
  Call,
  WhatsApp,
  InfoRounded,
  LocalShipping
} from '@mui/icons-material'

const btnStyle = {
  cursor: 'pointer',
  height: '40px',
  lineHeight: '40px',
  width: '40px',
  margin: '0 5px',
  background: theme.palette.primary.main,
  borderRadius: '50%',
  padding: '10px'
}

// MUI styles are lost in cesium overlays
export default function LocationCard() {
  return (
    <Card sx={{ m: 2 }}>
      <div>
        <img
          height="200px"
          src={`//picsum.photos/500/200?random=${Math.random() * 100}`}
          alt="location picture"
          style={{
            margin: '0 auto',
            width: '100%'
          }}
        />
      </div>
      <Typography>
        <b>Driver:</b> Sakkie De Kock
      </Typography>
      <button style={btnStyle}>
        <Call style={{ fill: theme.palette.primary.contrastText }} />
      </button>
      <button style={btnStyle}>
        <Sms style={{ fill: theme.palette.primary.contrastText }} />
      </button>
      <button style={btnStyle}>
        <WhatsApp style={{ fill: theme.palette.primary.contrastText }} />
      </button>
      <button style={btnStyle}>
        <InfoRounded style={{ fill: theme.palette.primary.contrastText }} />
      </button>
      <button style={btnStyle}>
        <LocalShipping style={{ fill: theme.palette.primary.contrastText }} />
      </button>
      <br />
    </Card>
  )
}
