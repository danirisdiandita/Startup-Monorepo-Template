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
            user = { ...user, ...results, email: user?.name, signInProvider: "credentials" };
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
            throw new Error(user?.detail);
          }
        }
      } else {
        return false;
      }
    },

    async jwt({ token, user, account, profile }) {
      if (account?.provider === "google") {
        // generate access_token from backend instead of from google sign in 


        const backendService = new BackendService()
        const googleSignInConfig = {
          method: HttpMethod.POST,
          headers: { "Content-Type": "application/json" },
          data: {
            email: token?.email,
            first_name: profile?.given_name ? profile?.given_name : 'Guest',
            last_name: profile?.family_name ? profile?.family_name : 'Guest',
            access_token: account?.access_token
          }
        }


        const results = await backendService.request("/v1/users/google-login", googleSignInConfig)
        // return {
        //   access_token: account?.access_token,
        //   expires_at: account?.expires_at,
        //   refresh_token: account?.refresh_token,
        //   ...token, 
        //   first_name: profile?.given_name ? profile?.given_name : 'Guest', 
        //   last_name: profile?.family_name ? profile?.family_name: 'Guest', 
        //   signInProvider: "google",
        // };

        return {
          access_token: results?.access_token,
          expires_at: account?.expires_at,
          refresh_token: results?.refresh_token,
          ...token,
          first_name: profile?.given_name ? profile?.given_name : 'Guest',
          last_name: profile?.family_name ? profile?.family_name : 'Guest',
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
      // }
    },

    async session({ session, user, token }) {
      return {
        ...token,
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
