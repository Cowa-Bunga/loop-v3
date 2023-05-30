export default function loadRouteForTrip(trip_id) {
  return fetch(`/api/route/${trip_id}`)
    .then((res) => res.json())
    .then((res) => res)
}
