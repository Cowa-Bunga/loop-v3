import { handler } from '@pages/api/api.handler'
import { IDriverInterface } from '@pages/api/drivers/drivers.interface'

export default async (req, res) => {
  try {
    const { hubId } = req.query
    const response = await handler<IDriverInterface[]>(req, res, `hub/${hubId}`)

    res.status(200).json(response.data)
  } catch (e) {
    console.log('error', e)
    return e
  }
}
