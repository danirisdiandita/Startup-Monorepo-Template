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
        baseUrl: "http://localhost:8000/api/v1/teams/default-team-members",
        prepareHeaders: async (headers, { getState }) => {
            return addTokenToRequest(headers, { getState })
        }
    }),
    endpoints: (builder) => ({
        getDefaultMembers: builder.query<Member[], void>({
            query: () => ``,
        }),
    }),
})


export const { useGetDefaultMembersQuery } = memberApi;

// [
//     {
//       "id": 1,
//       "user_id": 86,
//       "email": "norma.risdiandita@gmail.com",
//       "first_name": "Norma Dani",
//       "last_name": "Risdiandita",
//       "team_id": 5,
//       "team_name": "norma.risdiandita@gmail.com",
//       "role": "admin",
//       "access": "admin"
//     }
//   ]