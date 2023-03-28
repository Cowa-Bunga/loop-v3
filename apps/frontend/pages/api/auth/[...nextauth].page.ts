import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

export const authOptions = {
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,

  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin'
  },

  // session: {
  //   strategy: 'jwt'
  // },

  providers: [
    CredentialsProvider({
      name: 'loop-auth',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },

      async authorize(credentials) {
        console.warn('authorize', credentials)

        const user = await axios({
          url: 'http://localhost:3333/api/auth/login',
          method: 'post',
          data: {
            email: credentials.email,
            password: credentials.password
          }
        })

        if (user) {
          return Promise.resolve(user?.data)
        }

        return null
      }
    })
  ],

  secret: process.env.NEXTAUTH_SECRET,

  // callbacks: {
  //   async jwt({ token, user, account }) {
  //     if (account && user) {
  //       return {
  //         ...token,
  //         accessToken: user.token,
  //         refreshToken: user.refreshToken,
  //       };
  //     }

  //     return token;
  //   },

  //   async session({ session, token }) {
  //     session.user.accessToken = token.accessToken;
  //     session.user.refreshToken = token.refreshToken;
  //     session.user.accessTokenExpires = token.accessTokenExpires;

  //     return session;
  //   },
  // },

  theme: {
    colorScheme: 'light',
    brandColor: '#FFF',
    logo: 'https://www.loop.co.za/wp-content/uploads/2021/12/Logo.svg'
  },

  debug: process.env.NODE_ENV === 'development'
}

export default NextAuth(authOptions)
