import { URL, URLSearchParams } from 'url'

// test
export const getCityBoundaries = async (query, options = {} as {
  url?: string
  format?: string
}) => {
  const url = new URL(
    options.url || 'https://nominatim.openstreetmap.org/search'
  )

  url.search = new URLSearchParams({
    q: query,
    format: options.format || 'json',
    polygon_geojson: 1
  } as any).toString()

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const results = await response.json()
  const { geojson } = results[0]

  return geojson
}
