import Actions from '../actions'
import { MODEL_CLIENT_EMPTY } from '@util/models/client/model'

jest.mock('next-auth/react', () => ({
  ...jest.requireActual('next-auth/react'),
  signIn: jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve({ error: '', status: 403, ok: false, url: '' })
    )
}))

describe('actions', () => {
  it('should be defined', () => {
    expect(Actions).toBeDefined()
  })

  it('should trigger setState for change method', () => {
    const setState = jest.fn()
    const state = { ...MODEL_CLIENT_EMPTY, clientSelected: false }
    const e = { target: { value: 'test' } }
    const key = 'test'
    Actions(state, setState).change(e, key)
    expect(setState).toHaveBeenCalledWith({ ...state, [key]: e.target.value })
  })

  it('should trigger setState for submit method', () => {
    const setState = jest.fn()
    const state = { ...MODEL_CLIENT_EMPTY, clientSelected: false }
    const e = { preventDefault: jest.fn() }
    Actions(state, setState).submit(e)
    expect(setState).toHaveBeenCalledWith({ ...state, clientSelected: true })
  })
})
