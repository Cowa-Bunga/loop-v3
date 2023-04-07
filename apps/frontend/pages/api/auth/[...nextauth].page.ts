import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios, { AxiosResponse } from 'axios'
import { modelClientList } from '@util/models/client/helpers'

const API_AUTH_URL = process.env.API_AUTH_URL
const NEXTAUTH_URL = process.env.NEXTAUTH_URL

export const authOptions = {
  NEXTAUTH_URL,
  API_AUTH_URL,

  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin'
  },

  session: {
    strategy: 'jwt'
  },

  providers: [
    CredentialsProvider({
      name: 'loop-auth',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },

      async authorize({ email, password }) {
        const loginResponse: AxiosResponse<IClientLogin> = await axios({
          url: `${API_AUTH_URL}/client/fetch`,
          method: 'post',
          data: { email, password }
        })

        if (loginResponse?.data?.success) {
          const key = Object.keys(loginResponse.data.body.clients)[0]
          const client = loginResponse.data.body.clients[key]

          const token: AxiosResponse<IGenerateTokenResponse> = await axios({
            url: `${API_AUTH_URL}/client/generate-auth-token`,
            method: 'post',
            data: {
              client_id: client.client_id,
              user_id: client.user_id,
              password
            }
          })

          return {
            ...loginResponse?.data,
            ...token.data,
            ...client
          }
        } else {
          return false
        }
      }
    })
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          user_id: user.body.id,
          client_id: user.client_id,
          logoUrl: user.logo,
          email: user.email,
          token: user.token,
          firebase_token: user.firebase_token,
          permissions: {
            fleet: user.permissions.fleet,
            administrator: user.permissions.administrator,
            scopes: user.permissions.scopes
          },
          tokenType: user.token_type,
          maxAge: user.expires_in,
          clients: modelClientList(user.body.clients)
        } satisfies ISessionUser
      }
      return token
    },
    async session({ session, token }) {
      return { ...session, user: token }
    }
  },

  theme: {
    colorScheme: 'light',
    brandColor: '#FFF',
    logo: 'https://www.loop.co.za/wp-content/uploads/2021/12/Logo.svg'
  },

  debug: process.env.NODE_ENV !== 'production'
}

export default NextAuth(authOptions as NextAuthOptions)
