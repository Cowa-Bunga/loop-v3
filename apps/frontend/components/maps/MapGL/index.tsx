/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Map } from 'react-map-gl'
import maplibregl from 'maplibre-gl'
import { DEFAULT_THEME, ASSETS } from '../shared/config'
import { useState, useMergeState } from '@hooks'
import DeckGL from '@deck.gl/react/typed'
import { layers } from '../shared/live_layers'
import { EditableGeoJsonLayer } from 'nebula.gl'
import { Toolbox } from './components/ToolBox'
import { FlyToInterpolator, LinearInterpolator, MapView } from 'deck.gl/typed'
import { ViewMode } from 'nebula.gl'
import { ui } from './style'
import QuickActions from './components/QuickActions'

export default function MapGL() {
  const [state, setState] = useMergeState({
    rotate: false,
    mode: null,
    selectedFeatureIndexes: [],
    geojson: {
      type: 'FeatureCollection',
      features: []
    },
    viewport: {
      latitude: -34.0821499,
      longitude: 18.851262,
      zoom: 13,
      pitch: 45,
      bearing: 0
    }
  } as any)

  const theme = DEFAULT_THEME
  const [mode, setMode] = useState(() => ViewMode)
  const [modeConfig, setModeConfig] = useState({})

  const rotate = () => {
    setState({
      rotate: true,
      viewport: {
        ...state.viewport,
        bearing: state.viewport.bearing + 120,
        transitionDuration: 10000,
        transitionInterpolator: new LinearInterpolator(['bearing']),
        onTransitionEnd: state.rotate ? rotate : null
      }
    } as any)

    setTimeout(() => {
      setState({ rotate: false })
    }, 10000)
  }

  const cities = {
    TRIP: { loc: [-34.0751499, 18.844262], zoom: 13.8 },
    DRIVER: { loc: [-34.0723511, 18.8273627], zoom: 19 },
    RSA: { loc: [-30.5595, 22.9375], zoom: 4 },
    JHB: { loc: [-26.195246, 28.034088], zoom: 12 },
    CPT: { loc: [-33.918861, 18.4233], zoom: 12 },
    DBN: { loc: [-29.883333, 31.049999], zoom: 12 }
  }

  const goto = (c) => {
    setState({
      rotate: false,
      viewport: {
        ...state.viewport,
        latitude: cities[c].loc[0],
        longitude: cities[c].loc[1],
        zoom: cities[c].zoom,
        transitionDuration: 5000,
        transitionInterpolator: new FlyToInterpolator()
      }
    })
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
        opacity: 0.2,
        selectable: true,
        billboard: true,
        pickable: true,
        pointType: 'circle+text',
        getText: (f: { properties: { name: string } }) => f.properties.name,
        getTextSize: 12,
        getTextColor: [255, 255, 255]
      },
      guides: {
        getFillColor: (_guide: unknown) => [255, 255, 255],
        getTextColor: () => [255, 255, 255]
      }
    }
  })

  const comboLayers = [toolbox, ...layers({ theme })]
  const mapView = new MapView({})

  return (
    <div style={ui.container}>
      <DeckGL
        views={[mapView]}
        // @ts-ignore
        layers={comboLayers}
        controller={{ doubleClickZoom: false }}
        _animate={true}
        initialViewState={state.viewport}
        getCursor={toolbox.getCursor.bind(DeckGL)}
        getTooltip={({ object }) => object?.label && object.label}
      >
        <Map reuseMaps mapLib={maplibregl} mapStyle={ASSETS.MAP_STYLE}></Map>
      </DeckGL>

      <QuickActions data={cities} goto={goto} rotate={rotate} />

      <Toolbox
        mode={state.mode}
        modeConfig={modeConfig}
        onSetModeConfig={(modeConfig) => setModeConfig(modeConfig)}
        onSetGeoJson={(obj: { updatedData: unknown }) => {
          setState({ geojson: obj.updatedData })
        }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSetMode={(mode: any) => {
          setModeConfig({ modeConfig: null })
          setMode(mode)
        }}
      />
    </div>
  )
}
