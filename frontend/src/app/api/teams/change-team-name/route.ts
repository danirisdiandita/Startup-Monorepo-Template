import BackendService, { HttpMethod } from "@/common/backend.service";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  // Do whatever you want

  const { new_name } = await req.json();
  const headers = req.headers
  let bearerToken = '';
  headers.forEach((value, key) => {
    if (key === 'authorization') {
      bearerToken = value
    }
  })

  const config = {
    method: HttpMethod.PUT,
    headers: {
      Authorization: bearerToken
    },
    data: {
      new_name
    }
  }
  const backendService = new BackendService();
  const results = await backendService.request("/v1/teams/change-team-name", config)
  return NextResponse.json({ results }, { status: 200 });
}