import { RadialChart } from 'react-vis'
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'

const data = [
  {
    angle: 4,
    label: 'car'
  },
  {
    angle: 23,
    label: 'truck'
  },
  {
    angle: 14,
    label: 'bike'
  },
  {
    angle: 27,
    label: 'drone'
  }
]

export default function DriverCard({ title }) {
  return (
    <Card>
      <CardHeader
        sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}
        title={title}
        titleTypographyProps={{ fontSize: '10px' }}
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <RadialChart
            animation
            style={{
              stroke: 'transparent',
              strokeLinejoin: 'round'
            }}
            colorRange={[
              'steelBlue',
              'yellow',
              'lightGreen',
              'gold',
              
            ]}
              width={200}
              height={200}
              data={data}
              innerWidth={160}
              labelsRadiusMultiplier={1.1}
              labelsStyle={{
                fontSize: 10
              }}
              showLabels
            />
          </Grid>
          <Grid item xs={6}>
            <List>
              {data.map((v) => (
                <ListItem
                  key={v}
                  disablePadding
                  sx={{ height: '40px', m: 0, p: 0 }}
                >
                  <ListItemButton>
                    <ListItemText primary={v.label} />
                    <ListItemIcon>{v.angle}</ListItemIcon>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
