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

        console.log('req req ', req)
        // Add logic here to look up the user from the credentials supplied
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };#
        const user = {
          name: credentials?.email,
          password: credentials?.password,
        };

        console.log("credentials from authorize", credentials);

        const backendService = new BackendService()

        const loginConfig = {
          method: HttpMethod.POST,
          headers: {'Content-Type': 'application/json'}, 
          data: {
            username: credentials?.email,
            password: credentials?.password
          }
        }

        try {
          const results = await backendService.login(loginConfig)
          user.token = results
          if (results?.access_token) {
            return user 
          } else {
            return null 
          }
        } catch (error) {
          return null 
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google") {
        // do sign in to the backend to get refresh token
        console.log("doing google auth");
      } else if (
        account?.provider === "credentials"
      ) {
        if (user) {
          return true 
        } else {
          return false 
        }
      } else  {
        return false; 
      }
      return true;
    },

    async jwt({ token, user, account }) {
      // jwt user {                                              
      //   name: 'norma.risdiandita@gmail.com',                  
      //   password: 'ug3tug3tug3t',
      //   token: {              
      //     access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJub3JtYS5yaXNkaWFuZGl0YUBnbWFpbC5jb20iLCJleHAiO
      // jE3MjA3OTAzMjF9.9En07tFan3HHtUXWYz5sIXiGTk88xAyf6LE_nbWc_OE',
      //     refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJub3JtYS5yaXNkaWFuZGl0YUBnbWFpbC5jb20iLCJleHAi
      // OjE3MjMyOTU5MjF9.JfwKfeWO8dhbrXj1O_e8BAIX5ewTiZ7D8XQxJ0vyrbs',
      //     token_type: 'bearer'                                
      //   }                                                     
      // } 

      // do refresh token if access_token is expired 

      

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