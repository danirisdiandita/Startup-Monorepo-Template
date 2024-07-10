import BackendService from "@/common/backend.service";
import { NextApiRequest, NextApiResponse } from "next";


import { NextResponse } from 'next/server'
 
export async function GET(request: NextApiRequest) {
  const verificationToken = request.url?.split("/api/verify-email/")?.at(-1)

  const backendService = new BackendService() 
  const results = await backendService.request('/v1/users/verify/' + verificationToken)

  console.log('verification results ', results)
  return NextResponse.json({ results })
}

export async function POST(request: NextApiRequest, response: NextApiResponse) {
    console.log('POST GITU', request)
}