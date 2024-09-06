"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";
import BackendService, { RequestConfig, HttpMethod } from "@/common/backend.service";
import { Env } from "@/common/env";


export const generateSubscriptionInfo = async () => {


    const session = await getServerSession(authOptions);

    const config: RequestConfig = {
        method: HttpMethod.GET,
        data: {}
    };

    console.log("lemon squeezy api url", Env.lemonSqueezyApiUrl);
    try {
        const lemonSqueezyUrl = Env.lemonSqueezyApiUrl + "/billing/subscription";
        const response = await fetch(lemonSqueezyUrl, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${Env.lemonSqueezyApiKey}`
            }
        });
       
        const data = await response.json();
        console.log("data from lemon squeezy", data);
        return data;
    } catch (error) {
        console.error(error);


    }
}