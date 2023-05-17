import axios from 'axios'

describe('GET /geo', () => {
  it('should return a status 200', async () => {
    const res = await axios.get(`/geo`)
    expect(res.status).toBe(200)
  })
})
