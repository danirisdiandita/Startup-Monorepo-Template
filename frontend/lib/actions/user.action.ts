'use server'
import { parseStringify } from "../utils";
export const signIn = async ({ email, password }: signInProps) => {
    try {
        console.log(email, password)


        return parseStringify({ email, password });

    } catch (error) {
        console.log('Error', error)
    }
}

export const signUp = async ({ password, ...userData }: SignUpParams) => {
    const { email, firstName, lastName } = userData;

    // saving to database 

    try {
        console.log(email, firstName, lastName)
        return parseStringify({ email, firstName, lastName })

    } catch (error) {
        console.log('Error', error)
    }
}

