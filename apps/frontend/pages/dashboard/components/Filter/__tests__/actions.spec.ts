import Actions from '../actions'

describe('Actions', () => {
  it('should update state with tabChange triggered', () => {
    const setState = jest.fn()
    const state = { tab: 0 }
    const index = 1
    Actions(state, setState).tabChange(index)
    expect(setState).toHaveBeenCalledWith({ tab: index })
  })

  it('should update state with hubChange triggered', () => {
    const setState = jest.fn()
    const state = { hub: '' }
    const e = { target: { value: 'test' } }
    Actions(state, setState).hubChange(e)
    expect(setState).toHaveBeenCalledWith({ hub: e.target.value })
  })
})
