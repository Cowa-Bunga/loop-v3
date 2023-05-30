import { SpeedDial, SpeedDialAction } from '@mui/material'
import { ui } from './style'
import { MODE_GROUPS } from './modes'
import { Actions } from './actions'

export function Toolbox({ onSetMode, onSetGeoJson }: MapGlToolboxProps) {
  const actions = Actions(onSetGeoJson)

  return (
    <>
      {MODE_GROUPS.map((modeGroup, i) => (
        <SpeedDial
          key={i}
          direction="left"
          ariaLabel="loop controls"
          sx={{ ...ui.speedDial, top: modeGroup.top }}
          icon={<modeGroup.icon />}
        >
          {modeGroup.modes.map((dial) => (
            <SpeedDialAction
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
