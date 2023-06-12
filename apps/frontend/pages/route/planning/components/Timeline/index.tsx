import { DeliveryDining, ChevronRight } from '@mui/icons-material'
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab'
import { Typography } from '@mui/material'
import { ui } from './style'

export default function BasicTimeline() {
  return (
    <Timeline>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((v) => (
        <TimelineItem key={v} sx={ui.timelineItem}>
          <TimelineSeparator>
            <TimelineDot variant="outlined" color="success">
              <DeliveryDining />
            </TimelineDot>
            <TimelineConnector color="success" />
          </TimelineSeparator>
          <TimelineContent sx={ui.timelineContent}>
            <Typography sx={ui.time}>11:15am - 13:00pm</Typography>
            <ChevronRight sx={ui.chevron} />
            <Typography sx={ui.address}>23 Main street</Typography>
            <Typography sx={ui.subtitle}>Reme Marshall</Typography>
            <Typography sx={ui.subtitle}>#Delivery</Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
