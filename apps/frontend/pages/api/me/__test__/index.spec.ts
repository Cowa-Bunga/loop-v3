import GetMeAPI from '@pages/api/me/index.page'
import { handler } from '@util/lib/loop-api/request-wrapper'

const mockHandler = handler as jest.Mock
jest.mock('@util/lib/loop-api/request-wrapper', () => ({
  handler: jest.fn()
}))
// mock for res.status(response.status).json(response.data)

const mockReq = {} as unknown
const mockRes = {
  send: jest.fn()
} as unknown

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
