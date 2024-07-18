import BackendService from "@/common/backend.service";
import { NextApiRequest, NextApiResponse } from "next";

import { NextResponse } from "next/server";

export async function GET(request: NextApiRequest) {
  const verificationToken = request.url?.split("/api/verify-email/")?.at(-1);
  const backendService = new BackendService();
  try {
    const results = await backendService.request(
      "/v1/users/verify/" + verificationToken
    );
    return NextResponse.json({ results });
  } catch (error) {
    console.log('error rererere', error?.message)
    throw new Error(error.message)
  }
}
