import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authOptions } from "../../../lib/authOptions";
import { getSession } from "next-auth/react";


const addTokenToRequest = async (headers: any, { getState }: any) => {
    const session: any = await getSession();
    if (session?.access_token) {
        headers.set("Authorization", `Bearer ${session.access_token}`);
    }
    return headers;
};

interface Member {
    id: number;
    user_id: number;
    email: string;
    first_name: string;
    last_name: string;
    team_id: number;
    team_name: string;
    role: string;
    access: string;
}

export const memberApi = createApi({
    reducerPath: 'memberApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/",
        prepareHeaders: async (headers, { getState }) => {
            return addTokenToRequest(headers, { getState })
        }
    }),
    endpoints: (builder) => ({
        getDefaultMembers: builder.query<Member[], void>({
            query: () => `teams/default-team-members`,
        }),

        // updateDefaultWorkspaceName: builder.mutation<Member[], void>({

        // })
    }),
})


export const { useGetDefaultMembersQuery } = memberApi;
