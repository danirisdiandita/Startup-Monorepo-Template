import BackendService from "@/common/backend.service";
import { NextApiRequest, NextApiResponse } from "next";

import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // const verificationToken = request.url?.split("/api/verify-email/")?.at(-1);

  const searchParams = request.nextUrl.searchParams;

  // console.log("searchParams", searchParams);

  const backendService = new BackendService();
  try {
    const results = await backendService.request(
      "/v1/users/verify?" + searchParams.toString() //  + verificationToken
    );

    return NextResponse.json({ results });
  } catch (error) {
    return NextResponse.json({ error: JSON.stringify(error) }, { status: 401 });
  }
}
