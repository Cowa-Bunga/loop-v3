import { handler } from '@util/lib/loop-api/request-wrapper'
import { NextApiRequest, NextApiResponse } from 'next'

const GetMeAPI = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
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
