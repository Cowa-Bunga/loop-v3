import { handler } from '../api.handler'
import { getServerSession } from 'next-auth/next'
import { createMocks } from 'node-mocks-http'

jest.mock('axios')

const mockGetServerSession = getServerSession as jest.Mock

jest.mock('@pages/api/auth/[...nextauth].page', () => ({
  authOptions: {
    providers: [],
    session: {
      user: {}
    }
  }
}))
jest.mock('next-auth/next', () => ({
  getServerSession: jest.fn(),
  default: jest.fn(),
  __esModule: true
}))
describe('handler', () => {
  it('should return a 401 when the users sessions is undefined', async () => {
    mockGetServerSession.mockResolvedValue(undefined)

    const { req, res } = createMocks({
      method: 'GET'
    })

    await handler(req, res, 'path')

    expect(res._getStatusCode()).toBe(401)
  })

  it('should return a 200 when the users sessions is defined', async () => {
    mockGetServerSession.mockResolvedValue({
      user: {}
    })

    const { req, res } = createMocks({
      method: 'GET'
    })

    await handler(req, res, 'path')

    expect(res._getStatusCode()).toBe(200)
  })
})
