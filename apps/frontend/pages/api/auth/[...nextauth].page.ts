import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

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

      async authorize({ email, password }, req) {
        if (process.env.NX_MODE === 'duo') {
          const user = await axios({
            url: 'http://localhost:3333/api/auth/login',
            method: 'post',
            data: {
              email,
              password
            }
          });
          if (user) {
            return Promise.resolve(user?.data);
          }
          return null;
        } else {
          // TODO: remove this - DEV ONLY
          return {
            id: 'sadfg-sfdgg-sdfgg-sdfgg',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@doe.co',
            settings: {
              theme: 'light'
            },
            _auth: {
              email,
              password,
              token: 'sadfg-sfdgg-sdfgg-sdfgg',
              permissions: []
            }
          };
        }
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

  async session({ session, token }) {
    console.warn('next-auth: session cb', session, token);
    session.user.accessToken = token.accessToken;
    session.user.refreshToken = token.refreshToken;
    session.user.accessTokenExpires = token.accessTokenExpires;

    return session;
  },

  // signin page theming
  theme: {
    colorScheme: 'light',
    brandColor: '#FFF',
    logo: 'https://www.loop.co.za/wp-content/uploads/2021/12/Logo.svg'
  },

  debug: process.env.NODE_ENV === 'development'
};

export default NextAuth(authOptions as NextAuthOptions);
