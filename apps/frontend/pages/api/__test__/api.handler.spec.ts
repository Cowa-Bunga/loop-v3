import { handler } from '@pages/api/api.handler'
import { createMocks } from 'node-mocks-http'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

let mockGetServerSession = {}
jest.mock('next-auth/next', () => ({
  __esModule: true,
  getServerSession: jest.fn().mockResolvedValue(() => mockGetServerSession),
  default: jest.fn().mockResolvedValue({})
}))
describe('handler', () => {
  let mock

  beforeAll(() => {
    mock = new MockAdapter(axios)
  })

  afterEach(() => {
    mock.reset()
  })

  it('should return 200 when session', async () => {
    const { req, res } = createMocks({
      method: 'GET'
    })

    mockGetServerSession = {
      user: {
        token: 'test'
      }
    }

    mock.onGet('https://cb-dos-api-ukxjb66ceq-ew.a.run.app/me').reply(200, {})

    await handler(req, res, 'me', 'GET')

    expect(res._getStatusCode()).toBe(200)
  })

  xit('should return 401 when no session', async () => {
    const { req, res } = createMocks({
      method: 'GET'
    })

    await handler(req, res, 'me', 'GET')

    expect(res._getStatusCode()).toBe(401)
  })
})
