const Actions = (_state, setState) => ({
  tabChange: (index) => {
    setState({ tab: index })
  },

  hubChange: (e) => {
    setState({ hub: e.target.value })
  }
})

export default Actions
