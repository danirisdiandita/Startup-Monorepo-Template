'use server'
import { Env } from "@/common/env";
import { parseStringify } from "../utils";
import BackendService, { HttpMethod } from "@/common/backend.service";
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

    const backendService = new BackendService(); 
    try {
        const config = {
            method: HttpMethod.POST, 
            data: {
                email, 
                first_name: firstName, 
                last_name: lastName, 
                password, 
            }
        }
        const results = await backendService.request("/v1/users/register", config)

        
        // sample results shown below 

        // results {
        //     email: 'testermberoh@gmail.com',
        //     password: '$2b$12$Msqt506Llfr.a14ETUIp3.MaCm.GCLSLPlp.nUHFIJCf2UxAr3V4S',
        //     last_name: 'Mberoh',
        //     id: 11,
        //     first_name: 'Tester',
        //     verified: false
        //   }
        return parseStringify(results)

    } catch (error) {
        throw error 
    }
}

