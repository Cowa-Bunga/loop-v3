import { authOptions } from '@pages/api/auth/[...nextauth].page'
import { getServerSession } from 'next-auth/next'
import { NextAuthOptions } from 'next-auth'
import axios, { AxiosResponse } from 'axios'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export async function handler<T>(
  req,
  res,
  path: string,
  method: Method = 'GET'
): Promise<AxiosResponse<T>> {
  const session = await getServerSession(
    req,
    res,
    authOptions as NextAuthOptions
  )
  console.debug('session', session)
  if (!session) {
    res.status(401).json({ message: 'You must be logged in.' })
    return
  }

  const data = { ...session.user } as ISessionUser

  return axios<AxiosResponse<T>, never>({
    url: `${process.env.DOS_API_URL}/${path}`,
    method,
    headers: {
      Authorization: `Bearer ${data.token}`
    }
  })
}
