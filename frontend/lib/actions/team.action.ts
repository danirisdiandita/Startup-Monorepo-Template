"use server";
import BackendService, { HttpMethod } from "@/common/backend.service";
import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";
import { parseStringify } from "../utils";

export const sendTeamInvite = async ({ email }: { email: string }) => {
  try {
    const session = await getServerSession(authOptions);

    let config = {
      method: HttpMethod.POST,
      data: {
        subject: "request invitation link",
        recipient: email,
        sender: session?.email,
        body: "",
      },
    };

    const backendService = new BackendService({
      accessToken: session?.access_token,
    });

    try {
      const response = await backendService.request(
        "/v1/teams/invitation-link",
        config
      );

      console.log("response", response?.link);

      config = {
        method: HttpMethod.POST,
        data: {
          subject: `${session?.first_name} ${session?.last_name} invited you to collaborate on DataQuery`,
          recipient: email, 
          sender: session?.email, 
          body: await 
        },
      };
      return parseStringify(response);
    } catch (error) {}
  } catch (error) {}
};
