import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { Env } from "@/common/env";
import BackendService, { HttpMethod } from "@/common/backend.service";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: Env.googleClientId as string,
      clientSecret: Env.googleClientSecret as string,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "email", type: "text", placeholder: "Your Name" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        let user = {
          name: credentials?.email,
          password: credentials?.password,
        };

        const backendService = new BackendService();

        const loginConfig = {
          method: HttpMethod.POST,
          headers: { "Content-Type": "application/json" },
          data: {
            username: credentials?.email,
            password: credentials?.password,
          },
        };

        try {
          const results = await backendService.login(loginConfig);

          if (results?.access_token) {
            user = { ...user, access_token: results };
            return user;
          } else {
            return results;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: { signIn: "/sign-in", error: "/login" },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google") {
      } else if (account?.provider === "credentials") {
        if (user?.access_token) {
          return true;
        } else {
          if (user?.detail) {
            throw new Error(user?.detail);
          }
        }
      } else {
        return false;
      }
    },

    async jwt({ token, user, account }) {
      if (user?.access_token) {
        token = Object.assign({}, token, {
          access_token: user?.access_token?.access_token,
          refresh_token: user?.access_token?.refresh_token,
        });
      }

      // if expired do refresh token here
      const expiredTime: number = token.exp as number;
      if (Math.floor(new Date().getTime() / 1000) > expiredTime) {
        if (token?.refresh_token) {
          const backendService = new BackendService();
          const refreshTokenConfig = {
            method: HttpMethod.POST,
            headers: { "Content-Type": "application/json" },
            data: {
              refresh_token: token?.refresh_token,
            },
          };

          const results = await backendService.request(
            "/v1/users/refresh",
            refreshTokenConfig
          );
          token = results;
        }
      }
      return token;
    },

    async session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          token,
          username: (token?.account as any)?.username,
        },
      };
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24,
  },
  session: {
    maxAge: 60 * 60 * 24,
  },
};

// below is session data from client
// {
//   "data": {
//     "user": {
//       "name": "norma.risdiandita@gmail.com"
//     },
//     "expires": "2024-08-09T21:39:13.372Z"
//   },
//   "status": "authenticated"
// }
