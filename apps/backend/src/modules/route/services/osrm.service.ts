import { Injectable } from '@nestjs/common'
import { OSRM } from '@routingjs/osrm'

@Injectable()
export class OSRMService {
  async directions() {
    const osrm = new OSRM({
      baseUrl: 'http://localhost:5000'
    })

    // TODO req params:
    const start: [number, number] = [-26.2251971, 28.29998]
    const end: [number, number] = [-26.2490125, 28.3476559]

    const res = {
      directions: await osrm.directions([start, end], 'auto', {
        steps: true
      })
    }

    return res
  }

  async matrix() {
    return {}
  }
}
