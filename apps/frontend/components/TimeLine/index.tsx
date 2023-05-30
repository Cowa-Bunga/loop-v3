import { Box } from '@mui/material'
import { channels, epg } from './mock'
import { ui } from './style'
import {
  useEpg,
  Epg,
  Layout,
  ProgramBox,
  ProgramContent,
  ProgramFlex,
  ProgramStack,
  ProgramTitle,
  ProgramText,
  ProgramImage,
  useProgram
} from 'planby'

export const ProgramItem = ({ program, ...rest }) => {
  const { styles, formatTime, set12HoursTimeFormat, isLive } = useProgram({ program, ...rest })
  const { data } = program
  const { image, title, since, till } = data
  const sinceTime = formatTime(since, set12HoursTimeFormat()).toLowerCase()
  const tillTime = formatTime(till, set12HoursTimeFormat()).toLowerCase()

  return (
    <ProgramBox width={styles.width} style={{ ...ui.programBox, ...styles.position }}>
      <ProgramContent width={styles.width} isLive={isLive} style={ui.programContent}>
        <ProgramFlex>
          {<ProgramImage src={image} alt="Preview" style={ui.programImage} />}
          <ProgramStack>
            <ProgramTitle>{title}</ProgramTitle>
            <ProgramText>
              {sinceTime} - {tillTime}
            </ProgramText>
          </ProgramStack>
        </ProgramFlex>
      </ProgramContent>
    </ProgramBox>
  )
}

export default function TimeLine({ height }) {
  const { getEpgProps, getLayoutProps } = useEpg({
    epg,
    channels,
    startDate: '2023-05-25T08:30:00',
    endDate: '2023-05-25T18:30:00'
  })

  return (
    <Box sx={{ ...ui.container, height }}>
      <Epg {...getEpgProps()}>
        <Layout
          {...getLayoutProps()}
          renderProgram={({ program, ...rest }) => <ProgramItem key={program.data.id} program={program} {...rest} />}
        />
      </Epg>
    </Box>
  )
}
