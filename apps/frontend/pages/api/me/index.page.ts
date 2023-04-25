import { handler } from '@util/lib/loop-api/request-wrapper'

const GetMeAPI = async (req, res): Promise<void> => {
  const response = await handler<IMeInterface>(req, res, 'me', 'GET')
  res.send(response.data)
}

export default GetMeAPI
