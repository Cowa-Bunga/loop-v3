interface IState {
  tab: number
  regionHub: string
  hubs: string[]
}

const types = {
  REGION_CHANGE: 'REGION_CHANGE',
  TAB_CHANGE: 'TAB_CHANGE',
  HUBS_CHANGE: 'HUBS_CHANGE'
}

const initialState: IState = {
  tab: 0,
  regionHub: '',
  hubs: []
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.REGION_CHANGE:
      return {
        ...state,
        regionHub: action.payload
      }
    case types.TAB_CHANGE:
      return {
        ...state,
        tab: action.payload
      }
    case types.HUBS_CHANGE:
      return {
        ...state,
        hubs: action.payload
      }
    default:
      return state
  }
}

export { reducer, types, initialState }
