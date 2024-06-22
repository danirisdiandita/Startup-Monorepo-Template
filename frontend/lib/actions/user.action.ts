'use server'
import { Env } from "@/common/env";
import { parseStringify } from "../utils";
export const signIn = async ({ email, password }: signInProps) => {
    try {
        console.log(email, password)


        return parseStringify({ email, password });

    } catch (error) {
        console.log('Error', error)
    }
}

interface SignUpParams {
    email?: string; 
    firstName?: string; 
    lastName?: string; 
    password?: string; 
}


export const signUp = async ({ password, ...userData }: SignUpParams) => {
    const { email, firstName, lastName } = userData;

    // saving to database 

    // Env.backendUrl 

    try {
        // console.log(email, firstName, lastName)
        const response = await fetch(Env.backendUrl)
        return parseStringify({ email, firstName, lastName })

    } catch (error) {
        console.log('Error', error)
    }
}

