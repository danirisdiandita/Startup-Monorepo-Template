import BackendService, { HttpMethod } from "@/common/backend.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const backendService = new BackendService()
    const headers = request.headers
    let bearerToken = '';
    headers.forEach((value, key) => {
        if (key === 'authorization') {
            bearerToken = value
        }
    })
    const config = {
        method: HttpMethod.GET,
        headers: {
            Authorization: bearerToken
        }
    }
    const results = await backendService.request("/v1/teams/default-team-members", config)
    return NextResponse.json(results)
}