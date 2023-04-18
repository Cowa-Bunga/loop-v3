const Actions = (state, setState) => ({
  change: (e, key: string) => {
    setState({ ...state, [key]: e.target.value })
  },

  submit: (e) => {
    e.preventDefault()
    setState({ ...state, clientSelected: true, authenticating: true })
  }
})

export default Actions
