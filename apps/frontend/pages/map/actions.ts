const Actions = (_state, setState) => ({
  regionChange: (e) => {
    setState({ region: e.target.value })
  }
})

export default Actions
