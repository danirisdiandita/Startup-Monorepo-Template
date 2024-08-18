"use server";
import { Env } from "@/common/env";
import { parseStringify } from "../utils";
import BackendService, { HttpMethod } from "@/common/backend.service";
import { renderAsync } from "@react-email/components";
import VerifyEmail from "../../emails/VerifyEmail";
import ForgotPasswordEmail from "../../emails/ForgotPasswordEmail";
import { string } from "zod";
import { authOptions } from "../authOptions";
import { getServerSession } from "next-auth/next";

interface SignUpParams {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  invite_link?: string;
}

export const signUp = async ({ password, ...userData }: SignUpParams) => {
  const { email, firstName, lastName, invite_link } = userData;

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

    let queryParams: { verification_token: string; invite_link?: string } = {
      verification_token: results["verification_token"],
      ...(invite_link && { invite_link: invite_link }),
    };

    const queryString = new URLSearchParams(queryParams).toString();

    const verificationConfig = {
      method: HttpMethod.POST,
      data: {
        subject: "Verify Your Account",
        recipient: email,
        sender: "norma.risdiandita@gmail.com",
        body: await renderAsync(
          VerifyEmail({
            username: firstName + " " + lastName,
            inviteLink: Env.nextAuthURL + "/verification?" + queryString,
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

export const sendForgotPasswordEmail = async ({ email }: { email: string }) => {
  try {
    // generate 12 hours expiration token
    const backendService = new BackendService();

    let config: any = {
      method: HttpMethod.POST,
      data: {
        email: email,
      },
    };

    let results = await backendService.request(
      "/v1/users/forgot-password-token",
      config
    );
    let forgotPasswordToken = "";

    if (results?.token) {
      forgotPasswordToken = results?.token;
    } else {
      throw new Error(results.detail);
    }

    config = {
      method: HttpMethod.POST,
      data: {
        subject: "Reset Your Password",
        recipient: email,
        sender: "norma.risdiandita@gmail.com",
        body: await renderAsync(
          ForgotPasswordEmail({
            username: email,
            forgotPasswordLink:
              Env.nextAuthURL + "/reset-password/" + forgotPasswordToken,
          })
        ),
      },
    };

    await backendService.request(
      "/v1/users/send-forgot-password-email",
      config
    );
  } catch (error) {
    throw error;
  }
};

export const changeNewPassword = async ({
  forgotPasswordToken,
  newPassword,
}: {
  forgotPasswordToken: string;
  newPassword: string;
}) => {
  try {
    const requestConfig = {
      method: HttpMethod.POST,
      data: {
        password: newPassword,
      },
    };

    const backendService = new BackendService({
      accessToken: forgotPasswordToken,
    });
    const response = await backendService.request(
      "/v1/users/reset-password",
      requestConfig
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const resendVerificationEmail = async ({
  email,
  firstName,
  lastName,
}: {
  email: string;
  firstName: string;
  lastName: string;
}) => {
  const backendService = new BackendService();
  try {
    let config: any = {
      method: HttpMethod.POST,
      data: {
        email: email,
      },
    };

    let response: any = await backendService.request(
      "/v1/users/autogenerate-new-verification-token",
      config
    );

    if (response?.verification_token) {
      config = {
        method: HttpMethod.POST,
        data: {
          subject: "Verify Your Account",
          recipient: email,
          sender: "norma.risdiandita@gmail.com",
          body: await renderAsync(
            VerifyEmail({
              username: firstName + " " + lastName,
              inviteLink:
                Env.nextAuthURL +
                "/verification/" +
                response["verification_token"],
            })
          ),
        },
      };

      await backendService.request("/v1/users/send-email-verification", config);
    } else {
      throw new Error("Verification Token somehow not generated");
    }
  } catch (error) {}
};

export const changeFirstNameAndLastName = async ({
  firstName,
  lastName,
}: {
  firstName: string | undefined;
  lastName: string | undefined;
}) => {
  const session = await getServerSession(authOptions);
  try {
    let config: any = {
      method: HttpMethod.PUT,
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    };

    const backendService = new BackendService({
      accessToken: session?.access_token,
    });
    const response = await backendService.request(
      "/v1/users/change-firstname-lastname",
      config
    );

    return response;
  } catch (error) {}
};

export const changePasswordFromCurrentPassword = async ({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}) => {
  const session = await getServerSession(authOptions);
  try {
    let config: any = {
      method: HttpMethod.PUT,
      data: {
        current_password: currentPassword,
        new_password: newPassword,
      },
    };

    const backendService = new BackendService({
      accessToken: session?.access_token,
    });

    const response = await backendService.request(
      "/v1/users/change-password",
      config
    );

    return response;
  } catch (error) {
    throw error;
  }
};
