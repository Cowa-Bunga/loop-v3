export const Actions = (state, setState) => ({
  toggleLeft: () => {
    setState({ left: !state.left })
  },

  toggleRight: () => {
    setState({ right: !state.right })
  }
})
