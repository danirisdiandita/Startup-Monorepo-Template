"use server";
import BackendService, { HttpMethod, RequestConfig } from "@/common/backend.service";
import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";
import { parseStringify } from "../utils";
import { TeamInvitationEmail } from "../../emails/TeamInvitation";
import { Env } from "@/common/env";
import { renderAsync } from "@react-email/components";

export const sendTeamInvite = async ({
  email,
  team_id,
}: {
  email: string;
  team_id: number;
}) => {
  try {
    const session = await getServerSession(authOptions);

    let config: RequestConfig = {
      method: HttpMethod.POST,
      data: {
        subject: "request invitation link",
        recipient: email,
        sender: session?.email,
        body: "",
        team_id: team_id 
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

      let invitationLink: string;

      if (response?.is_user_registered) {
        invitationLink =
          Env.nextAuthURL + "/sign-in" + `?invite_link=${response?.link}`;
      } else {
        invitationLink =
          Env.nextAuthURL + "/sign-up" + `?invite_link=${response?.link}`;
      }

      config = {
        method: HttpMethod.POST,
        data: {
          subject: `${session?.first_name} ${session?.last_name} invited you to collaborate on DataQuery`,
          recipient: email,
          sender: session?.email,
          body: await renderAsync(
            TeamInvitationEmail({
              username: `${session?.first_name} ${session?.last_name}`,
              inviteLink: invitationLink,
            })
          ),
        },
      };

      await backendService.request(
        "/v1/teams/send-team-email-invitation",
        config
      );
      return parseStringify(response);
    } catch (error) {
      throw error 
    }
  } catch (error) {
    throw error 
  }
};
