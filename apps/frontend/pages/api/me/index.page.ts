import { IMeInterface } from '@pages/api/me/me.interface'
import { handler } from '@pages/api/api.handler'

export default async (req, res) => {
  try {
    const response = await handler<IMeInterface>(req, res, 'me', 'GET')

    res.status(200).json(response.data)
  } catch (e) {
    console.log('error', e)
    return e
  }
}
