// @see: https://resium.reearth.io/examples/
import {
  Viewer,
  Entity,
  PointGraphics,
  EntityDescription,
  Scene,
  SkyBox,
  Globe,
  Camera,
  CameraFlyTo
} from 'resium'
import { Cartesian3, createWorldTerrain, Color } from 'cesium'
import LocationCard from '../LocationCard'

const terrainProvider = createWorldTerrain()
const position = Cartesian3.fromDegrees(18.4233, -33.918861, 3000)

export default function Cesium({ viewStyle }) {
  return (
    <Viewer
      full
      terrainProvider={terrainProvider}
      style={viewStyle || { margin: '60px 360px 0 360px' }}
    >
      <Scene backgroundColor={Color.BLACK}>
        <Globe enableLighting={true} />
        <Camera />
        <CameraFlyTo duration={6} destination={position} />
        <SkyBox show={false} />
        <Entity id="loop" position={position} name="feature">
          <EntityDescription>
            <LocationCard />
          </EntityDescription>
          <PointGraphics pixelSize={16} color={Color.WHITE} />
        </Entity>
      </Scene>
    </Viewer>
  )
}
