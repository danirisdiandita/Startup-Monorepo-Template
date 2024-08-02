import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/authOptions";


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

const session = await getServerSession(authOptions)


const memberApi = createApi({
    reducerPath: 'memberApi', 
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/v1/teams/default-team-members", 
        prepareHeaders: (headers, {getState}) => {
            const accessToken = session?.access_token 
        }
    }), 
    endpoints: (builder) => ({
        getDefaultMembers: builder.query<Member[], void>({

        })
    })
}) 

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