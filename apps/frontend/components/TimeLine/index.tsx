import { Box } from '@mui/material'
import { channels, epg } from './mock2'
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
  useProgram,
  ChannelBox,
  ChannelLogo,
  Channel
} from 'planby'

interface ChannelItemProps {
  channel: Channel
}

const ChannelItem = ({ channel }: ChannelItemProps) => {
  const { position, logo } = channel
  return (
    <ChannelBox {...position}>
      <ChannelLogo
        onClick={() => console.log('channel', channel)}
        src={logo}
        alt="Logo"
        style={{
          borderRadius: '50%',
          width: '40px',
          boxShadow: '4px 0 10px rgba(0, 160, 199, 0.5)'
        }}
      />
    </ChannelBox>
  )
}

export const ProgramItem = ({ program, ...rest }) => {
  const { styles, formatTime, set12HoursTimeFormat, isLive } = useProgram({ isBaseTimeFormat: true, program, ...rest })
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
            <ProgramTitle style={{ fontSize: '11px' }}>{title}</ProgramTitle>
            <ProgramText style={{ fontSize: '10px' }}>
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
    startDate: '2023-06-07T08:30:00',
    endDate: '2023-06-07T18:30:00',
    itemHeight: 65,
    dayWidth: window?.innerWidth * 2
  })

  return (
    <Box sx={{ ...ui.container, height }}>
      <Epg {...getEpgProps()}>
        <Layout
          {...getLayoutProps()}
          renderChannel={({ channel }) => <ChannelItem key={channel.uuid} channel={channel} />}
          renderProgram={({ program, ...rest }) => <ProgramItem key={program.data.id} program={program} {...rest} />}
        />
      </Epg>
    </Box>
  )
}
