const Actions = (state, setState) => ({
  change: (e, key: string) => {
    console.log('change', e.target.value, key)
    setState({ ...state, [key]: e.target.value })
  },

  submit: (e) => {
    e.preventDefault()
    setState({ ...state, clientSelected: true })
  }
})

export default Actions
