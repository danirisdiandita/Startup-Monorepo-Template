import { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string 
        })
    ], 
    callbacks: {
        async signIn({user, account, profile, email, credentials}) {
            console.log('user', user)
            console.log('account', account)
            console.log('profile', profile)
            console.log('email', email)
            console.log('credentials', credentials)

            if (account?.provider === 'google') {
                // do sign in to the backend to get refresh token 
                console.log('doing google auth')
            }
            return true 
        }
    }
};