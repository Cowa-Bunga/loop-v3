import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios, { AxiosResponse } from 'axios';
import { IClientLogin } from '../../../../../libs/auth/IclientLogin';
import { signInWithCustomToken } from 'firebase/auth';
import { firebaseAuth } from '../../_app.page';
import { IGenerateTokenResponse } from './auth.interface';

export const authOptions = {
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  API_AUTH_URL: process.env.DOS_AUTH_URL,

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

      async authorize({ email, password }, req) {
        if (process.env.NX_MODE === 'duo') {
          const user = await axios({
            url: `${authOptions.API_AUTH_URL}/client/fetch`,
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
          const res: AxiosResponse<IClientLogin> = await axios({
            url: `${authOptions.API_AUTH_URL}/client/fetch`,
            method: 'post',
            data: {
              email,
              password
            }
          });
          if (res && res.data.success) {
            const key = Object.keys(res.data.body.clients)[0];
            const client = res.data.body.clients[key];

            const token: AxiosResponse<IGenerateTokenResponse> = await axios({
              url: `${authOptions.API_AUTH_URL}/client/generate-auth-token`,
              method: 'post',
              data: {
                client_id: client.client_id,
                user_id: client.user_id,
                password
              }
            });

            return {
              ...res?.data,
              ...token.data,
              client_id: client.client_id
            };
          }
          return null;
        }
      }
    })
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...user.body,
          auth_token: user.token,
          firebase_token: user.firebase_token,
          client_id: user.client_id
        };
      }
      return token;
    },
    async session({ session, token }) {
      return { ...session, user: token };
    }
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
