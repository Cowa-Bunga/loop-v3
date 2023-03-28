const Actions = (state, setState) => ({
  tabChange: (index) => {
    setState({ ...state, tab: index })
  },

  regionChange: (e) => {
    setState({ ...state, region: e.target.value })
  },

  hubChange: (e) => {
    setState({ ...state, hub: e.target.value })
  }
})

export default Actions
