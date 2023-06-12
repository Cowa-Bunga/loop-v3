import { GridLayer, HeatmapLayer } from 'deck.gl/typed'
import DATA from '../../../public/dataset/orders.json'

// mock - courier guy mYPoEBMCCuqJ0DIZ7yfM
export const layers = ({ theme }) => {
  const data = DATA.filter((v) => v.YearMonth === '2022-11')
  return [
    new HeatmapLayer({
      id: 'hexagon-layer',
      data,
      getWeight: (d) => d.delivered_orders,
      aggregation: 'SUM',
      getPosition: (d) => [d.customer_longitude, d.customer_latitude]
    }),

    new GridLayer({
      id: 'new-grid-layer',
      data,
      pickable: true,
      extruded: true,
      cellSize: 1000,
      elevationScale: 100,
      getElevation: (d) => d.delivered_orders * 100,
      // opacity: 0.1,
      getPosition: (d) => [d.customer_longitude, d.customer_latitude],
      upperPercentile: 100,
      colorRange: [
        [1, 152, 189],
        [73, 227, 206],
        [216, 254, 181],
        [254, 237, 177],
        [254, 173, 84],
        [209, 55, 78]
      ]
    })
  ]
}
