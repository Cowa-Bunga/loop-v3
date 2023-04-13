import { doc, getDoc } from 'firebase/firestore'
import { db } from '@util/lib/firebase'
import { types } from '@pages/map/reducer'

const Actions = (_state, dispatch) => ({
  regionChange: async (e, clientId: string) => {
    const [type, value] = e.target.value.split('-')

    dispatch({ type: types.REGION_CHANGE, payload: e.target.value })

    if (type == 'r') {
      const coll = doc(db, `clients/${clientId}/regions/${value}`)
      const d = await getDoc(coll)
      const hubs = d.data().hub_ids || []

      dispatch({ type: types.HUBS_CHANGE, payload: hubs })
    } else if (type == 'h') {
      dispatch({ type: types.HUBS_CHANGE, payload: [value] })
    } else {
      dispatch({ type: types.HUBS_CHANGE, payload: [] })
    }
  },

  tabChange(e, value: number) {
    dispatch({ type: types.TAB_CHANGE, payload: value })
  }
})

export default Actions
