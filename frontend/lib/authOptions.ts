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
        const user = {
          name: credentials?.email,
          password: credentials?.password,
        };

        console.log("credentials from authorize", credentials);

        // const backendService = new BackendService()

        // const loginConfig = {

        //   method: HttpMethod.POST,
        //   data: {
        //     username: credentials?.email,
        //     password: credentials?.password
        //   }

        // }
        // await backendService.request("/v1/users/login", )

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("user from signIn", user);
      console.log("account from signIn", account);
      console.log("profile from signIn", profile);
      console.log("email from signIn", email);
      console.log("credentials from signIn", credentials);

      if (account?.provider === "google") {
        // do sign in to the backend to get refresh token
        console.log("doing google auth");
      } else {
        console.log("account?.provider", account?.provider);
      }
      return true;
    },

    async jwt({ token, user, account }) {
      console.log("jwt", account);
      // jwt undefined
      console.log("jwt user", user);
      // jwt user undefined 

      console.log("jwt token", token);
      // jwt token {
      //   name: 'norma.risdiandita@gmail.com',
      //   iat: 1720647132,
      //   exp: 1723239132,
      //   jti: '2354297a-5f7c-4f49-9b95-b129d248b69d'
      // }

      return token;
    },

    async session({ session, user, token }) {
      console.log("session - session", session);

      // session - session {                          
      //   user: {
      //     name: 'norma.risdiandita@gmail.com',
      //     email: undefined,            
      //     image: undefined                                                                          
      //   },
      //   expires: '2024-08-09T21:37:11.741Z'
      // }

      console.log("session - user", user);
      // session - user undefined
      console.log("session - token", token);
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
          username: (token?.account as any)?.username,
        },
      };
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24
  }, 
  session: {
    maxAge: 60 * 60 * 24 
  }
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