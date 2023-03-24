import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export const authOptions = {
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  providers: [
    CredentialsProvider({
      name: 'Loop Demo',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jim@smith.com' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        const user = await axios({
          url: 'http://localhost:3333/api/auth/login',
          method: 'post',
          data: {
            email: credentials.email,
            password: credentials.password,
          },
        });
        return Promise.resolve(user?.data);
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile?.id;
      }
      return token;
    },

    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export default NextAuth(authOptions);
