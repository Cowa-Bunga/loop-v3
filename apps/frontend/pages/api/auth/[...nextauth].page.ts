import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios, { AxiosResponse } from 'axios';
import { IClientLogin } from '../../../../../libs/auth/IclientLogin';
import { IGenerateTokenResponse, ISessionUser } from './auth.interface';
import { modelClientList } from '@util/models/client.model';
import { Auth, signInWithCustomToken } from 'firebase/auth';

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
              ...client
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
        } satisfies ISessionUser;
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
