import { purple } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography } from '@mui/material'

export default function Course() {
  return (
    <Card sx={{ m: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: purple[500] }} aria-label="course">
            L
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Loop's ML and reporting"
        subheader="September 14, 2024"
      />
      <CardMedia component="img" height="194" image={`/artificial-intelligence.jpg`} alt="yip" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This course covers our ML and reporting tools, allowing you to get the most out of your data.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}
