import { useState, useRef, useMemo } from 'react'
import DeckGL from '@deck.gl/react'
import { useNextFrame, BasicControls, useDeckAdapter } from '@hubble.gl/react'
import { LineLayer } from '@deck.gl/layers'
import { DeckAnimation } from 'hubble.gl'
// import PopMotion from 'popmotion'

// WIP / TEST CODE
const deckAnimation = new DeckAnimation({
  // Use applyLayerKeyframes to spread keyframe values onto layers by id.
  getLayers: (a) =>
    a.applyLayerKeyframes([
      new LineLayer({
        id: 'line-layer',
        data: [{ sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781] }]
      })
    ]),
  layerKeyframes: [
    {
      id: 'line-layer',
      timings: [0, 1000],
      keyframes: [{ opacity: 0 }, { opacity: 1 }]
    }
  ],
  cameraKeyframe: {
    timings: [0, 5000], // ms
    keyframes: [
      {
        latitude: 37.7853,
        longitude: -122.41669,
        zoom: 11.5,
        bearing: 140,
        pitch: 60
      },
      {
        latitude: 37.7853,
        longitude: -122.41669,
        zoom: 11.5,
        bearing: 0,
        pitch: 30
      }
    ]
    // easings: PopMotion.easeInOut
  }
})

const timecode = {
  start: 0, // ms
  end: 5000, // ms
  framerate: 30
}

const resolution = {
  width: 1920, // px
  height: 1080 // px
}

export default function Hubble() {
  const deckRef = useRef(null)
  const deck = useMemo(() => deckRef.current && deckRef.current.deck, [])
  const [busy, setBusy] = useState(false)
  const nextFrame = useNextFrame()

  const { adapter, cameraFrame, setCameraFrame } = useDeckAdapter(deckAnimation)

  // todo: breakout
  return (
    <div style={{ position: 'relative' }}>
      <DeckGL
        ref={deckRef}
        viewState={cameraFrame}
        onViewStateChange={({ viewState }) => setCameraFrame(viewState)}
        width={resolution.width}
        height={resolution.height}
        {...adapter.getProps({ deck, nextFrame })}
      />
      <div style={{ position: 'absolute' }}>
        <BasicControls adapter={adapter} busy={busy} setBusy={setBusy} formatConfigs={{}} timecode={timecode} />
      </div>
    </div>
  )
}
