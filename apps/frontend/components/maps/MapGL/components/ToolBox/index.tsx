import { SpeedDial, SpeedDialAction, FabProps } from '@mui/material'
import { ui } from './style'
import { MODE_GROUPS } from './modes'
import { Actions } from './actions'

export function Toolbox({ onSetMode, onSetGeoJson }: MapGlToolboxProps) {
  const actions = Actions(onSetGeoJson)

  return (
    <>
      {MODE_GROUPS.map((modeGroup, i) => (
        <SpeedDial
          FabProps={ui.small as FabProps}
          key={i}
          direction="left"
          ariaLabel="loop controls"
          sx={{ ...ui.speedDial, top: modeGroup.top }}
          icon={<modeGroup.icon sx={ui.white} />}
        >
          {modeGroup.modes.map((dial) => (
            <SpeedDialAction
              FabProps={ui.small as FabProps}
              key={dial.label}
              icon={<dial.content />}
              tooltipTitle={dial.label}
              onClick={() => {
                dial.mode && onSetMode(() => dial.mode)
                dial.action && actions[dial.action] && actions[dial.action](dial)
              }}
            />
          ))}
        </SpeedDial>
      ))}
    </>
  )
}
