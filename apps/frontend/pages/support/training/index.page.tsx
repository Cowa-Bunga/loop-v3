import { LayoutBase, Course } from '@components'
import { Container, Grid, Typography, Divider } from '@mui/material'

const Training = () => {
  return (
    <LayoutBase>
      <Container>
        <Typography variant="h5" component="h1" gutterBottom sx={{ pt: 6 }}>
          Training
        </Typography>
        <Divider />
        <Grid container>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Grid key={i} item sx={{ my: 2 }} xs={4}>
              <Course />
            </Grid>
          ))}
        </Grid>
      </Container>
    </LayoutBase>
  )
}
export default Training
