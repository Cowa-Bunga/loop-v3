import { diff } from 'deep-object-diff'

export const Actions = (state, setState) => ({
  addEmptyParcel: () => {
    const { parcels } = state
    const updatedParcels = [...parcels, { qrCode: '', size: '' }]
    setState({ parcels: updatedParcels })
  },

  updateParcel: (index, parcel) => {
    const { parcels } = state
    parcels[index] = parcel
    setState({ parcels })
  },

  updateFormData: (data) => {
    if (Object.keys(diff(state, data)).length != 0) {
      setState(data)
    }
  }
})
