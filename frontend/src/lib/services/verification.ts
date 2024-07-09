import { Env } from "@/common/env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Verification {
    verificationToken: string; 
}

export const verificationApi = createApi({
    reducerPath: 'verificationApi', 
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000'+ '/api/v1/users/'}), 
    endpoints: (builder) => ({
        getVerifyStatusToTrue: builder.query<Verification, string>({
            query: (verificationToken) => `verify/${verificationToken}`, 
        }), 
    })
})


export const { useGetVerifyStatusToTrueQuery } = verificationApi 