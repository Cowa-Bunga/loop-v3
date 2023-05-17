import axios from 'axios'

describe('GET /route', () => {
  it('should return a status 200', async () => {
    const res = await axios.get(`/route`)
    expect(res.status).toBe(200)
  })
})
