import { diff } from 'deep-object-diff'

export const Actions = (state, setState) => ({
  addEmptyParcel: () => {
    const { parcels } = state.data
    const updatedParcels = [...parcels, { qrCode: '', size: '' }]
    setState({ data: { parcels: updatedParcels } })
  },

  updateParcel: (index, parcel) => {
    const { parcels } = state.data
    parcels[index] = parcel
    setState({ data: { parcels } })
  },

  updateFormData: (data) => {
    if (Object.keys(diff(state.data, data)).length != 0) {
      setState({ data })
    }
  },

  getForms: async () => {
    const refs = ['create_task_form', 'parcels_form']
    const futures = refs.map((ref) => fetch(`/api/forms/${ref}`))

    try {
      const [create, parcels] = await Promise.all(futures)

      const createTaskForm = await create.json()
      const parcelsForm = await parcels.json()

      setState({
        data: createTaskForm.data,
        createForm: createTaskForm,
        parcelsForm: parcelsForm
      })
    } catch (e) {
      console.debug(e)
    }
  }
})
