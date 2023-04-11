import axios from 'axios'

export const REQ = (options = {}) => {
  // TODO: customise
  return axios(options)
}
