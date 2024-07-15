"use server";
import { Env } from "@/common/env";
import { parseStringify } from "../utils";
import BackendService, { HttpMethod } from "@/common/backend.service";
import { renderAsync } from "@react-email/components";
import VerifyEmail from "../../emails/VerifyEmail";
import ForgotPasswordEmail from  '../../emails/ForgotPasswordEmail'; 


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
      },
    };
    let results = await backendService.request("/v1/users/register", config);

    const verificationConfig = {
      method: HttpMethod.POST,
      data: {
        subject: "Verify Your Account",
        recipient: email,
        sender: "norma.risdiandita@gmail.com",
        body: await renderAsync(
          VerifyEmail({
            username: firstName + " " + lastName,
            inviteLink: Env.nextAuthURL + "/verification/" + results["verification_token"],
          })
        ),
      },
    };

    // sending email verification here 
    await backendService.request(
      "/v1/users/send-email-verification",
      verificationConfig
    );

    // if (verificationEmail) {
    //   redirect('/please-confirm')
    // }

    // sample results shown below

    // results {
    //     email: 'testermberoh@gmail.com',
    //     password: '$2b$12$Msqt506Llfr.a14ETUIp3.MaCm.GCLSLPlp.nUHFIJCf2UxAr3V4S',
    //     last_name: 'Mberoh',
    //     id: 11,
    //     first_name: 'Tester',
    //     verified: false
    //   }
    return parseStringify(results);
  } catch (error) {
    throw error;
  }
};


export const sendForgotPasswordEmail = async ({ email, forgotPasswordToken }: { email: string, forgotPasswordToken: string }) => {
  const backendService = new BackendService(); 
  try {
    const config = {
      method: HttpMethod.POST, 
      data: {
        subject: "Reset Your Password", 
        recipient: email, 
        sender: "norma.risdiandita@gmail.com", 
        body: await renderAsync(ForgotPasswordEmail({
          username: email, 
          forgotPasswordLink: Env.nextAuthURL + "/reset-password/" + forgotPasswordToken, 
        }))
      }
    }
  } catch (error) {
    
  }
}