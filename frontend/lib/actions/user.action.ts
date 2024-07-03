'use server'
import { Env } from "@/common/env";
import { parseStringify } from "../utils";
import BackendService, { HttpMethod } from "@/common/backend.service";
import { render, renderAsync } from "@react-email/components";
import VerificationEmail from '../../emails/verifyEmail';
import VercelInviteUserEmail from "../../emails/vercelInviteUserEmail";

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
        let results = await backendService.request("/v1/users/register", config)
        
        const verificationConfig = {
            method: HttpMethod.POST,
            data: {
                subject: "Verify Your Account",
                recipient: email,
                sender: "norma.risdiandita@gmail.com",
                body: await  renderAsync(VercelInviteUserEmail({  })) // url: "https://google.com", user: firstName + " " + lastName
            }
        }

        // do verification here 
        const verificationEmail = await backendService.request("/v1/users/verify", verificationConfig)
       
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

