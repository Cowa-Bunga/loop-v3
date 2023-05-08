import {
  Avatar,
  Box,
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

export default function DriverCard({ title }) {
  return (
    <Card>
      <CardHeader sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }} title={title} titleTypographyProps={{ fontSize: '10px' }} />
      <CardContent>
        <Grid container>
          <Grid item xs={4}>
            <Avatar sx={{ height: '100px', width: '100px', mt: '50px',  bgcolor: 'primary.main' }}>N</Avatar>
          </Grid>
          <Grid item xs={8}>
            <List>
              {['Car', 'Bike', 'Bakkie', 'Truck'].map((v) => (
                <ListItem key={v} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>12</ListItemIcon>
                    <ListItemText primary={v} />
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
