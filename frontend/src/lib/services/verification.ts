import { Env } from "@/common/env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Verification {
  verificationToken: string;
}

export const verificationApi = createApi({
  reducerPath: "verificationApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getVerifyStatusToTrue: builder.query<Verification, string>({
      query: (verificationToken) => `verify-email/${verificationToken}`,
    }),
  }),
});

export const { useGetVerifyStatusToTrueQuery } = verificationApi;
