import { DATASET } from '../shared/config'

export default async function load(_locations, cb) {
  const route = await fetch(DATASET.ROUTE).then((res) => res.json())
  const isochrone = await fetch(DATASET.ISOCHRONE).then((res) => res.json())

  const waypoints =
    route.waypoints?.map((v: { location: unknown }, i: number) => ({
      ...v,
      coordinates: v.location,
      color: i === 0 ? [180, 250, 180] : [200, 100, 100]
    })) || []

  cb({
    isochrone,
    ...route,
    waypoints
  })
}
