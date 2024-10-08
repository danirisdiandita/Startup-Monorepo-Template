"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { TeamForUserState } from "@/lib/features/team/teamSlice";


const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();
  if (session?.access_token) {
    headers.set("Authorization", `Bearer ${session.access_token}`);
  }
  return headers;
};


export const memberApi = createApi({
  reducerPath: "memberApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    prepareHeaders: async (headers, { getState }) => {
      return addTokenToRequest(headers, { getState });
    },
  }),
  tagTypes: ["Member", "Team"],
  endpoints: (builder) => ({
    getDefaultMembers: builder.query<Member[], void>({
      query: () => `teams/default-team-members`,
      providesTags: ["Member"],
    }),
    updateDefaultWorkspaceName: builder.mutation({
      query: ({ team_name }) => ({
        url: "/teams/change-team-name",
        method: "PUT",
        body: {
          new_name: team_name,
        },
      }),
    }),
    validateTeamMember: builder.mutation<any, ValidateTeamInvitation>({
      query: ({ invite_link }) => ({
        url: `/teams/validate-team-member`,
        method: "POST",
        body: {
          invite_link,
        },
      }),
    }),

    getTeamInWhichUserIsMember: builder.query<TeamForUserState[], void>({
      query: () => `teams/team-in-which-user-is-member`,
      providesTags: ["Team"],
    }),
  }),
});

export const {
  useGetDefaultMembersQuery,
  useUpdateDefaultWorkspaceNameMutation,
  useValidateTeamMemberMutation,
  useGetTeamInWhichUserIsMemberQuery,
} = memberApi;
