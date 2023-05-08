import { Injectable } from '@nestjs/common'
import { Valhalla } from '@routingjs/valhalla'
import { OSRM } from '@routingjs/osrm'

// WIP - route api tests

@Injectable()
export class RouteService {
  async valhalla() {
    // URL defaults to http://valhalla1.openstreetmap.de
    const valhalla = new Valhalla()
    // TODO req params:
    const start: [number, number] = [-26.2251971, 28.29998]
    const end: [number, number] = [-26.2490125, 28.3476559]

    const res = {
      _query: { start, end },
      directions: await valhalla.directions([start, end], 'auto'),
      isochrones: await valhalla.reachability(start, 'auto', [1000, 1000])
    }
    return res
  }

  async osrm() {
    const osrm = new OSRM({
      baseUrl: 'http://localhost:5000',
      // headers:
      // apiKey:
    })
    // TODO req params:
    const start: [number, number] = [-26.2251971, 28.29998]
    const end: [number, number] = [-26.2490125, 28.3476559]

    // local docker test code
    //const makeURL = ({ coordinates, alternatives = false }) =>
    // `http://localhost:5000/route/v1/car/${coordinates}?geometries=geojson&steps=true`
    // `http://localhost:5000/route/v1/car/${coordinates}?alternatives=${alternatives}&steps=${true}&geometries=geojson&overview=full&annotations=true`

    // OSRM test
    // return await fetch(
    //   makeURL({
    //     coordinates: `${start._longitude},${start._latitude};${end._longitude},${end._latitude}`
    //   })
    // ).then((route) => route.json())

    const res = {
      directions: await osrm.directions([start, end], 'auto')
    }

    return res
  }

  async googleDirections() {
    return {}
  }
}
