const Actions = (_state, setState) => ({
  tabChange: (index) => {
    setState({ tab: index })
  },

  regionChange: (e) => {
    setState({ region: e.target.value })
  },

  hubChange: (e) => {
    setState({ hub: e.target.value })
  }
})

export default Actions
