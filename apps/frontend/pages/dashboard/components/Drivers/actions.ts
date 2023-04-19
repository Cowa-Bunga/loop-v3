import { DocumentData } from 'firebase/firestore'

const Actions = (_state, _setState) => ({
  modelDrivers: (documents: DocumentData[]): IDriver[] => {
    return documents.map((document) => ({
      id: document.id || document.NO_ID_FIELD,
      name: document.name,
      email: document.email,
      mobile_no: document.mobile_no,
      vehicle_type: document.vehicle_type,
      employee_code: document.employee_code,
      location: document.location,
      lunch: document.lunch,
      available: document.available,
      on_active_trip: document.on_active_trip,
      idle_since: document.idle_since,
      created_at: document.created_at
    }))
  },
  stringAvatar: (name: string) => {
    const fn = name.split(' ')[0][0]
    const ln = name.split(' ')[1] ? name.split(' ')[1][0] : ''

    return {
      sx: {
        bgcolor: _stringToColor(name)
      },
      children: `${fn}${ln}`
    }
  }
})

function _stringToColor(str: string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

export default Actions
