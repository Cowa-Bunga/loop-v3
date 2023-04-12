const Actions = (_state, setState) => ({
  regionChange: async (e) => {
    setState({ regionHub: e.target.value })
  },

  tabChange(e, value: number) {
    setState({ tab: value })
  }
})

export default Actions
