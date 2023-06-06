export const Actions = (state, setState) => ({
  toggleBottom() {
    setState({ bottomDrawer: state.bottomDrawer === '160px' ? 'calc(100vh - 60px)' : '160px' })
  },

  toggleCreate: () => {
    setState({ create: !state.create })
  },

  toggleMap: () => {
    setState({ routeView: !state.routeView })
  }
})
