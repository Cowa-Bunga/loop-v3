import { modelDrivers } from './modelDrivers'

export const Actions = (state, setState) => ({
  modelDrivers,

  toggleLeft: () => {
    setState({ left: !state.left })
  },

  toggleRight: () => {
    setState({ right: !state.right })
  },

  toggleCreate: () => {
    setState({ create: !state.create })
  },

  toggleMap: () => {
    setState({ routeView: !state.routeView })
  }
})
