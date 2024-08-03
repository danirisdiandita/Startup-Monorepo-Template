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
