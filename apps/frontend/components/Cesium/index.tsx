// @see: https://resium.reearth.io/examples/
import {
  Viewer,
  Entity,
  PointGraphics,
  EntityDescription,
  Scene,
  SkyBox,
  CameraLookAt
} from 'resium'
import { Cartesian3, createWorldTerrain, Color } from 'cesium'
import Course from '../Course'
import { Box } from '@mui/material'

const terrainProvider = createWorldTerrain()
const position = Cartesian3.fromDegrees(18.4233, -33.918861, 100)

export default function Cesium({ viewStyle }) {
  return (
    <Viewer
      full
      // terrainProvider={terrainProvider}
      style={viewStyle || { margin: '60px 360px 0 360px' }}
    >
      <Scene backgroundColor={Color.BLACK}>
        <CameraLookAt
          target={position}
          offset={new Cartesian3(5000, 5000, 5000)}
        />
        <SkyBox show={false} />
        <Entity id="loop" position={position} name="feature">
          <EntityDescription>
            <Box>
              <Course />
            </Box>
          </EntityDescription>
          <PointGraphics pixelSize={10} />
        </Entity>
      </Scene>
    </Viewer>
  )
}
