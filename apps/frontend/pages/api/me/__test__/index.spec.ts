import GetMeAPI from '@pages/api/me/index.page'
import { handler } from '@pages/api/api.handler'

const mockHandler = handler as jest.Mock
jest.mock('@pages/api/api.handler', () => ({
  handler: jest.fn()
}))
// mock for res.status(response.status).json(response.data)

const mockReq = {} as any
const mockRes = {
  send: jest.fn()
} as any

describe('GET /api/me', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should call handler with correct arguments and send response', async () => {
    const mockResponse = {
      status: 200,
      data: { name: 'John', age: 30 }
    }
    mockHandler.mockResolvedValueOnce(mockResponse)

    await GetMeAPI(mockReq, mockRes)

    expect(mockHandler).toHaveBeenCalledWith(mockReq, mockRes, 'me', 'GET')
    expect(mockRes.send).toHaveBeenCalledWith(mockResponse.data)
  })
})
