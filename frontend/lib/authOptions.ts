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
        // Add logic here to look up the user from the credentials supplied
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };#
        let user = {
          name: credentials?.email,
          password: credentials?.password,
        };

        // credentials from authorize {                                                                                                                                                                   email: 'norma.risdiandita@gmail.com',
        //   password: 'ug3tug3tug3tfdfds',
        //   csrfToken: 'dd6b27ccc546fd2075cd7ba68f079cc7916d3ee760a50dea5e7dc05b29a08e07',
        //   callbackUrl: 'http://localhost:3000/sign-in?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fsign-in&error=CredentialsSignin',
        //   json: 'true'
        // }

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
            // user.access_token = results 
            user = { ...user, access_token: results }
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
        // do sign in to the backend to get refresh token
        console.log('ninaninu')
        // if already registered then do sign in 

        // if not registered then do sign up to the backend 


        // 
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
        token = Object.assign({}, token, {access_token: user?.access_token})
      }
      return token;
    },

    async session({ session, user, token }) {
      // session - session {
      //   user: {
      //     name: 'norma.risdiandita@gmail.com',
      //     email: undefined,
      //     image: undefined
      //   },
      //   expires: '2024-08-09T21:37:11.741Z'
      // }
      // session - user undefined
      // session - token {
      //   name: 'norma.risdiandita@gmail.com',
      //   iat: 1720647431,
      //   exp: 1723239431,
      //   jti: '2c111dc2-1b3f-41b7-98cb-93ad5678d413'
      // }

      return {
        ...session,
        user: {
          ...session.user,
          username: (token?.account as any)?.username
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
