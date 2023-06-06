import axios from 'axios'

export const Actions = (state, setState) => ({
  load: () => {
    const res = axios.get('')
    setState({
      orders: res
    })
  }
})
