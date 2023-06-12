import { Card, Container, Grid } from '@mui/material'

export default function DriverProfile() {
  return (
    <Container>
      <Grid container>
        <Grid item xs={4}>
          <Card>sidebar</Card>
        </Grid>
        <Grid item xs={8}>
          <Card>content</Card>
        </Grid>
      </Grid>
    </Container>
  )
}
