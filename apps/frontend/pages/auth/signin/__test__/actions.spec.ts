import Actions from '../actions'
import { signIn } from 'next-auth/react'
import { MODEL_CLIENT_EMPTY } from '@util/models/client/model'
import fetchMock from 'jest-fetch-mock'

jest.mock('next-auth/react', () => ({
  ...jest.requireActual('next-auth/react'),
  signIn: jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve({ error: '', status: 403, ok: false, url: '' })
    )
}))

fetchMock.enableMocks()

describe('actions', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('should be defined', () => {
    expect(Actions).toBeDefined()
  })

  it('should trigger setState for change method', () => {
    const email = 'test@test.com'
    const setState = jest.fn()
    const state = {
      email: '',
      password: ''
    }
    const actions = Actions(state, setState)
    actions.change('email', email)
    expect(setState).toHaveBeenCalledWith({ email })
  })

  it('should call signIn for submit method', async () => {
    const setState = jest.fn()
    const state = {
      email: 'test@test.com',
      password: 'password'
    }
    const actions = Actions(state, setState)
    await actions.submit({
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      preventDefault: () => {}
    })

    expect(signIn).toHaveBeenCalledWith('credentials', {
      callbackUrl: 'http://localhost:3000/dashboard',
      redirect: false,
      email: state.email,
      password: state.password
    })
  })

  it('should call getUser method', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        user: {
          id: '1',
          firstname: 'test',
          lastname: 'test',
          mobile_no: '1234567890'
        },
        organization: 'test',
        hubs: [
          {
            id: '1',
            name: 'test',
            branches: []
          },
          {
            id: '2',
            name: 'test',
            branches: [
              {
                id: '1',
                name: 'test'
              }
            ]
          }
        ],
        regions: [
          {
            id: '1',
            name: 'test',
            hub_ids: ['1']
          },
          {
            id: '2',
            name: 'test',
            hub_ids: ['2']
          }
        ]
      })
    )

    const setState = jest.fn()
    const callback = jest.fn()
    const state = {
      email: '',
      password: ''
    }
    const actions = Actions(state, setState)

    await actions.getUser(MODEL_CLIENT_EMPTY, callback)

    expect(callback).toHaveBeenCalledWith({
      id: '1',
      client: MODEL_CLIENT_EMPTY,
      firstName: 'test',
      lastName: 'test',
      mobileNo: '1234567890',
      organization: 'test',
      hubs: [
        {
          id: '2',
          name: 'test',
          branches: [
            {
              id: '1',
              name: 'test'
            }
          ]
        }
      ],
      regions: [
        {
          id: '2',
          name: 'test',
          hub_ids: ['2']
        }
      ]
    })
  })
})
