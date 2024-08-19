import BackendService, { HttpMethod } from "@/common/backend.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Do whatever you want

  const teamInvitationEmail: TeamInvitationEmailInterface = await req.json();
  const headers = req.headers;
  let bearerToken = "";
  headers.forEach((value, key) => {
    if (key === "authorization") {
      bearerToken = value;
    }
  });

  const config = {
    method: HttpMethod.POST,
    headers: {
      Authorization: bearerToken,
    },
    data: teamInvitationEmail,
  };
  const backendService = new BackendService();
  const results = await backendService.request(
    "/v1/teams/invitation-link",
    config
  );
  return NextResponse.json({ results }, { status: 200 });
}
