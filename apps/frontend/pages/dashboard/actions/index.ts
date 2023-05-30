import { modelDrivers } from './modelDrivers'

export const Actions = (state, setState) => ({
  modelDrivers,

  toggleLeft: () => {
    setState({ left: !state.left })
  },

  toggleRight: () => {
    setState({ right: !state.right })
  },

  toggleBottom() {
    setState({ bottomDrawer: state.bottomDrawer === '160px' ? 'calc(100vh - 60px)' : '160px' })
  },

  toggleCreate: () => {
    setState({ create: !state.create })
  }
})
