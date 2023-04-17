import { IMeInterface } from '@pages/api/me/me.interface'
import { handler } from '@pages/api/api.handler'

const GetMeAPI = async (req, res): Promise<void> => {
  try {
    const response = await handler<IMeInterface>(req, res, 'me', 'GET')
    console.debug('response', response.data)
    res.status(200).json(response.data)
  } catch (e) {
    console.debug('error', e)
    res.status(500)
  }
}

export default GetMeAPI
