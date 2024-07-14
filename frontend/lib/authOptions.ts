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
        console.log("credentials", credentials);
        console.log("req", req);
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
  pages: { signIn: "/sign-in", error: "/sign-in" },
  callbacks: {
    async signIn({ user, account, profile }) {
      //  email, credentials
      if (account?.provider === "google") {
        console.log("account", account);
        return true;
        if (profile?.email && profile?.email_verified) {
          // signInWithGoogle

          const signInWithGoogleConfig = {
            method: HttpMethod.POST,
            headers: { "Content-Type": "application/json" },
            data: {
              email: profile?.email,
              first_name: profile?.given_name ? profile?.given_name : "Guest",
              last_name: profile?.family_name ? profile?.family_name : "Guest",
            },
          };

          // const backendService = new BackendService();
          // const results = await backendService.request("/v1/users/google-login", signInWithGoogleConfig)

          // this needs to be access_token and refresh_token
        }
        return true;

        //         user {   id: '115690064868974581249',
        //   name: 'Norma Dani Risdiandita',
        //   email: 'norma.risdiandita@gmail.com',
        //   image: 'https://lh3.googleusercontent.com/a/ACg8ocI-oFu2Mkz1jHkqXtFiZjQUckuzwTWrewvXZrY6ZPaevlrqBw=s96-c'
        // }
        // account {
        //   provider: 'google',
        //   type: 'oauth',
        //   providerAccountId: '115690064868974581249',
        //   access_token: '<access_token>',
        //   expires_at: 1720861951,
        //   scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
        //   token_type: 'Bearer',
        //   id_token: '<bearer type token>'
        // }
        // profile {
        //   iss: 'https://accounts.google.com',
        //   azp: '806317566931-6pi43a7jfj8nbnh9vcnrpbd8879snv78.apps.googleusercontent.com',
        //   aud: '806317566931-6pi43a7jfj8nbnh9vcnrpbd8879snv78.apps.googleusercontent.com',
        //   sub: '115690064868974581249',
        //   email: 'norma.risdiandita@gmail.com',
        //   email_verified: true,
        //   at_hash: 'vO-eyWn_93HuwtlzybKZNw',
        //   name: 'Norma Dani Risdiandita',
        //   picture: 'https://lh3.googleusercontent.com/a/ACg8ocI-oFu2Mkz1jHkqXtFiZjQUckuzwTWrewvXZrY6ZPaevlrqBw=s96-c',
        //   given_name: 'Norma Dani',
        //   family_name: 'Risdiandita',
        //   iat: 1720858352,
        //   exp: 1720861952
        // }
        // email undefined
        // credentials undefined
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
            refreshTokenConfig,
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
