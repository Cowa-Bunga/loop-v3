import { createMocks } from 'node-mocks-http'
import GetMeAPI from '@pages/api/me/index.page'
import { IMeInterface } from '@pages/api/me/me.interface'

const mockHandler = jest.fn()
jest.mock('@pages/api/api.handler', () => ({
  handler: jest.fn().mockImplementation(() => mockHandler)
}))

describe('GET /api/me', () => {
  xit('should return 200', async () => {
    const { req, res } = createMocks({
      method: 'GET'
    })

    const mockData: IMeInterface = {
      user: {
        id: '1',
        email: 'test@test.com',
        firstname: 'John',
        lastname: 'Doe',
        mobile_no: '1234567890',
        fleet: false,
        administrator: false
      },
      client_id: 'test',
      client_type: 'test',
      regions: [],
      hubs: [],
      organization: {
        id: '1',
        name: 'Test',
        logo: 'test'
      }
    }

    mockHandler.mockResolvedValue(() => ({
      status: 200,
      data: mockData
    }))

    await GetMeAPI(req, res)

    console.debug(res._getData())
    expect(res._getStatusCode()).toBe(200)
    // expect(JSON.parse(res._getData())).toEqual(
    //   expect.objectContaining(mockData)
    // )
  })
})
