'use server'
import BackendService, { HttpMethod } from "@/common/backend.service";
import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";
import { parseStringify } from "../utils";

export const sendTeamInvite = async ({ email }: { email: string }) => {
  try {
    const session = await getServerSession(authOptions);

    const config = {
      method: HttpMethod.POST,
      data: {},
    };

    const backendService = new BackendService({
      accessToken: session?.access_token,
    });

    const response = await backendService.request(
      "/v1/teams/send-team-email-invitation",
      config
    );

    return parseStringify(response);
  } catch (error) {}
};
