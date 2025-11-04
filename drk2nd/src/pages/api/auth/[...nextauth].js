import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { testURL } from '@/testURL';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const response = await axios.post(`${testURL}/api/login`, {
            username: credentials.username,
            password: credentials.password,
          });
          const user = response.data;
          if (user && user.token) {
            return {
              id_user: user.id_user,
              nama : user.nama,
              rank: user.rank,
              foto: user.foto,
              accessToken: user.token,
            };
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.rank = user.rank;
        token.foto = user.foto;
        token.nama = user.nama;
        token.id_user = user.id_user;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.rank = token.rank;
      session.user.foto = token.foto;
      session.user.id_user = token.id_user;
      session.user.nama = token.nama;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET_KEY,
});
