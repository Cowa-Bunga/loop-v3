import axios from 'axios'

const DATASET = {
  TRIP: '/dataset/trip.json',
  TRIPS: '/dataset/trips.json',
  ROUTE: '/dataset/osrm-test.json',
  ISOCHRONE: '/dataset/valhalla.json'
}

export const API = {
  getRoute: async ({ start, end }) =>
    await axios(DATASET.ROUTE, { data: { start, end } }),

  getTrip: async ({ tripId }) =>
    await axios(DATASET.TRIP, {
      data: { tripId }
    })
}
