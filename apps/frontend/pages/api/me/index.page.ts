import axios, { AxiosResponse } from 'axios'
import { getServerSession, NextAuthOptions } from 'next-auth'
import { authOptions } from '@pages/api/auth/[...nextauth].page'
import { IMeInterface } from '@pages/api/me/me.interface'

export default async (req, res) => {
  try {
    const session = await getServerSession(
      req,
      res,
      authOptions as NextAuthOptions
    )
    const data = { ...session.user } as ISessionUser

    const response: AxiosResponse = await axios<AxiosResponse<IMeInterface>>({
      url: `${process.env.DOS_API_URL}/me`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${data.token}`
      }
    })

    res.status(200).json(response.data)
  } catch (e) {
    console.log('error', e)
    return e
  }
}
