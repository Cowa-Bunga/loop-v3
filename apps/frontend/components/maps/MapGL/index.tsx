/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Map, useMap } from 'react-map-gl'
import maplibregl from 'maplibre-gl'
import { DEFAULT_THEME, ASSETS } from '../shared/config'
import { useEffect, useState, useMergeState } from '@hooks'
import DeckGL from '@deck.gl/react/typed'
import { ui } from './style'
import { layers } from '../shared/live_layers'
import { EditableGeoJsonLayer } from 'nebula.gl'
import { Toolbox } from '../shared/components/ToolBox'
import { MapView } from 'deck.gl/typed'
import load from '../shared/load'

export default function MapGL() {
  const [state, setState] = useMergeState({
    load: true,
    mode: null,
    start: [],
    end: [],
    waypoints: [],
    isochrone: null,
    trip: null,
    route: null,
    selectedFeatureIndexes: [],
    geojson: {
      type: 'FeatureCollection',
      features: []
    },
    viewport: {
      // longitude: 28.321779,
      // latitude: -26.2290333,
      latitude: -34.0829499,
      longitude: 18.8241262,
      zoom: 13,
      pitch: 45,
      bearing: 0
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any)

  useEffect(() => {
    if (state.load) {
      setState({ load: false })
      load([], (res) => {
        setState({
          trip: res.route.routes,
          isochrone: res.isochrones?.raw,
          start: [res.start._longitude, res.start._latitude],
          end: [res.end._longitude, res.end._latitude]
        })
      })
    }
  }, [setState, state.load])

  // const styles = [
  //   {
  //     label: 'Streets',
  //     styleName: 'OSM Liberty',
  //     styleUrl: 'https://maputnik.github.io/osm-liberty/style.json'
  //   },
  //   {
  //     label: 'Streets Bright',
  //     styleName: 'OSM Bright',
  //     styleUrl: ' https://demotiles.maplibre.org/styles/osm-bright-gl-style/style.json'
  //   },
  //   {
  //     label: 'terrain',
  //     styleName: 'terrain',
  //     //             'https://demotiles.maplibre.org/styles/osm-bright-gl-terrain/style.json'
  //     styleUrl: 'https://demotiles.maplibre.org/style.json'
  //   }
  // ]

  const theme = DEFAULT_THEME
  const [mode, setMode] = useState(() => null)
  const [modeConfig, setModeConfig] = useState({})
  const driver = [28.321779, -26.2290333]

  if (state.load) {
    return <div>loading</div>
  }

  /* @ts-ignore */
  const toolbox = new EditableGeoJsonLayer({
    id: 'geojson-layer-edit',
    data: state.geojson,
    mode,
    modeConfig: modeConfig,
    selectedFeatureIndexes: state.selectedFeatureIndexes,
    pickable: true,
    autoHighlight: true,
    getRadius: () => 10,
    onClick: (info: { index: number }) => {
      setState({ selectedFeatureIndexes: info.index })
    },
    onEdit: ({ updatedData }): void => {
      setState({ geojson: updatedData })
    },
    _subLayerProps: {
      geojson: {
        getFillColor: () => [116, 158, 199],
        opacity: 0.4,
        selectable: true,
        billboard: true,
        pickable: true,
        pointType: 'circle+text',
        getText: (f: { properties: { name: string } }) => f.properties.name,
        getTextSize: 12
      },
      guides: {
        getFillColor: (_guide: unknown) => [16, 58, 99]
      }
    }
  })

  const comboLayers = [
    toolbox,
    ...layers({
      driver,
      theme,
      start: state.start,
      end: state.end,
      waypoints: state.waypoints,
      trip: state.trip,
      iso: state.isochrone
    })
  ]

  const mapView = new MapView({})

  return (
    <div style={ui.container}>
      <DeckGL
        getTooltip={({ object }) => object?.label && object.label}
        views={[mapView]}
        // @ts-ignore
        layers={comboLayers}
        controller={{ doubleClickZoom: false }}
        _animate
        initialViewState={state.viewport}
        getCursor={toolbox.getCursor.bind(DeckGL)}
      >
        <Map reuseMaps mapLib={maplibregl} mapStyle={ASSETS.MAP_STYLE}></Map>
      </DeckGL>

      <Toolbox
        mode={state.mode}
        modeConfig={modeConfig}
        onSetModeConfig={(modeConfig) => setModeConfig(modeConfig)}
        onSetGeoJson={(obj: { updatedData: unknown }) => {
          setState({ geojson: obj.updatedData })
        }}
        onSetMode={(mode) => {
          setModeConfig({ modeConfig: null })
          setMode(mode)
        }}
      />
    </div>
  )
}
