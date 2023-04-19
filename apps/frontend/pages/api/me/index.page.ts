import { IMeInterface } from '@pages/api/me/me.interface'
import { handler } from '@pages/api/api.handler'

const GetMeAPI = async (req, res): Promise<void> => {
  const response = await handler<IMeInterface>(req, res, 'me', 'GET')

  res.send(response.data)
}

export default GetMeAPI
