import { deepmerge } from '@mui/utils'

// This file is for user preference rules
// there are two data sources for preferences, the api/db and the device
// device related rules may be small things from light/dark mode or further integrated items

// util method
export function hasPreference(rule: string) {
  return !!sdk.get(rule)
}

// management sdk
const sdk = {
  cache: {},

  init: () => {
    // TODO: encrypt/decrypt
    let local = JSON.parse(localStorage.getItem('loop-preferences'))
    local = local || {}
    // TODO: get db/api preferences to join
    const server = {}
    sdk.cache = { ...server, ...local, init: new Date() }
  },

  get: (key?: string) =>
    key ? (sdk.data[key] ? sdk.data[key] : false) : sdk.data,

  set: (data) => {
    sdk.data = deepmerge(sdk.data, data)
    return sdk.data
  },
  data: {}
}

//nb: not test
