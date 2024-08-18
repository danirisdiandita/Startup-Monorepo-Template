import { Env } from "@/common/env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Verification {
  verificationToken: string;
}

interface QueryParams {
  verification_token?: string;
  invite_link?: string;
}

export const verificationApi = createApi({
  reducerPath: "verificationApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getVerifyStatusToTrue: builder.query<Verification, QueryParams>({
      query: (queryParams) =>
        `verify-email?${new URLSearchParams(
          queryParams as Record<string, string>
        ).toString()}`,
      transformResponse: (response: { data: any }, meta, arg) => response.data,
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg
      ) => response.status,
    }),
  }),
});

export const { useGetVerifyStatusToTrueQuery } = verificationApi;
