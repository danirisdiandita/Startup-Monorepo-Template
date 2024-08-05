import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { Env } from "@/common/env";
import BackendService, { HttpMethod } from "@/common/backend.service";
import type { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

// export interface DefaultJWT extends Record<string, unknown> {
//   name?: string | null
//   email?: string | null
//   picture?: string | null
//   sub?: string
// }

declare module "next-auth" {
  interface User extends DefaultUser {
    name?: string;
    access_token?: string;
    refresh_token?: string;
    token_type?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    signInProvider?: string;
    detail?: string;
    access_token_expire?: number;
    refresh_token_expire?: number;
  }

  interface Session extends DefaultSession {
    name?: string;
    email?: string;
    access_token?: string;
    refresh_token?: string;
    token_type?: string;
    first_name?: string;
    last_name?: string;
    signInProvider?: string;
    iat?: number;
    exp?: number;
    jti?: string;
    access_token_expire?: number;
    refresh_token_expire?: number;
  }

  interface Profile {
    sub?: string;
    name?: string;
    email?: string;
    image?: string;
    given_name?: string;
    family_name?: string;
  }

  interface JWT extends DefaultJWT {
    name?: string;
    email?: string;
    access_token?: string;
    refresh_token?: string;
    token_type?: string;
    first_name?: string;
    last_name?: string;
    signInProvider?: string;
    iat?: number;
    exp?: number;
    jti?: string;
    access_token_expire?: number;
    refresh_token_expire?: number;
  }
}

// declare module "next-auth" {
//   interface Session {
//     user?: {
//       id: string;
//       access_token: string;
//     } & DefaultSession["user"];
//   }
//   interface User {
//     {
//       user?: {}
//     }
//   }
// }

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: Env.googleClientId as string,
      clientSecret: Env.googleClientSecret as string,
      authorization: { params: { access_type: "offline", prompt: "consent" } },
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
            user = {
              ...user,
              ...results,
              email: user?.name,
              signInProvider: "credentials",
            };
            if (user?.password) {
              delete user?.password;
            }
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
  pages: { signIn: "/sign-in", error: "/sign-in" },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        return true;
      } else if (account?.provider === "credentials") {
        if (user?.access_token) {
          return true;
        } else {
          if (user?.detail) {
            // return false;
            throw new Error(user?.detail);
            return false;
          }
        }
      } else {
        return false;
      }

      return false;
    },

    async jwt({ token, user, account, profile, trigger, session }) {
      if (trigger === "update") {
        return session?.data;
      }
      if (account?.provider === "google") {
        // generate access_token from backend instead of from google sign in

        const backendService = new BackendService();
        const googleSignInConfig = {
          method: HttpMethod.POST,
          headers: { "Content-Type": "application/json" },
          data: {
            email: token?.email,
            first_name: profile?.given_name ? profile?.given_name : "Guest",
            last_name: profile?.family_name ? profile?.family_name : "Guest",
            access_token: account?.access_token,
          },
        };

        const results = await backendService.request(
          "/v1/users/google-login",
          googleSignInConfig
        );

        return {
          access_token: results?.access_token,
          expires_at: account?.expires_at,
          refresh_token: results?.refresh_token,
          ...token,
          first_name: profile?.given_name ? profile?.given_name : "Guest",
          last_name: profile?.family_name ? profile?.family_name : "Guest",
          signInProvider: "google",
        };
      }
      if (token?.signInProvider === "google") {
        // do refresh token here

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

            token = { ...token, ...results };
          }
        }

        return token;
      }

      if (
        account?.provider === "credentials" ||
        token?.signInProvider === "credentials"
      ) {
        if (user?.access_token && user?.refresh_token) {
          token = Object.assign({}, token, {
            ...user,
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

            token = { ...token, ...results };
          }
        }

        return token;
      }
    },

    async session({ session, user, token }) {
      const expiredTime: number = token?.access_token_expire as number;
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

          token = { ...token, ...results };
        }
      }

      session.name = token.name as string;
      session.email = token.email as string;
      session.access_token = token.access_token as string;
      session.refresh_token = token.refresh_token as string;
      session.token_type = token.token_type as string;
      session.first_name = token.first_name as string;
      session.last_name = token.last_name as string;
      session.signInProvider = token.signInProvider as string;
      session.iat = token.iat as number;
      session.exp = token.exp as number;
      session.jti = token.jti as string;
      return session;
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24,
  },
  session: {
    maxAge: 60 * 60 * 24,
  },
};
