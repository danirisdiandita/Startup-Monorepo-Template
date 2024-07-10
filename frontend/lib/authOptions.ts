import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider  from "next-auth/providers/credentials";
import { Env } from "@/common/env";
import BackendService from "@/common/backend.service";

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
        const user = {name: credentials?.email, password: credentials?.password}

        console.log('credentials from authorize', credentials)


        const backendService = new BackendService() 

        const loginConfig = {
          
        }
        await backendService.request("/v1/users/login", )
        // backendService.request("")

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
        console.log('account?.provider', account?.provider)
      }
      return true;
    },
  },
};
