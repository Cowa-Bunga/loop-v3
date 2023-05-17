export default function loadRouteForTrip(locationArray) {
  return fetch('/api/route')
    .then((res) => res.json())
    .then((res) => res)
}
