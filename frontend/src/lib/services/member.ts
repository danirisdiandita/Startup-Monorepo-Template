import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authOptions } from "../../../lib/authOptions";
import { getSession } from "next-auth/react";
import { HttpMethod } from "@/common/backend.service";


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
    tagTypes: ['Member'],
    endpoints: (builder) => ({
        getDefaultMembers: builder.query<Member[], void>({
            query: () => `teams/default-team-members`,
        }),

        updateDefaultWorkspaceName: builder.mutation<Member, Partial<Member> & Pick<Member, 'team_name'>>({
            query: (team_name) => ({
                url: `teams/change-team-name`,
                method: HttpMethod.PUT,
                body: {
                    new_name: team_name
                }
            }),
            transformResponse: (response: { data: Member }, meta, arg) => response.data,
            transformErrorResponse: (
                response: { status: string | number },
                meta,
                arg,
            ) => response.status,
            invalidatesTags: ['Member'],
            // onQueryStarted is useful for optimistic updates
            // The 2nd parameter is the destructured `MutationLifecycleApi`
            async onQueryStarted(
                arg,
                { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
            ) { },
            // The 2nd parameter is the destructured `MutationCacheLifecycleApi`
            async onCacheEntryAdded(
                arg,
                {
                    dispatch,
                    getState,
                    extra,
                    requestId,
                    cacheEntryRemoved,
                    cacheDataLoaded,
                    getCacheEntry,
                }
            ) { },
        })
    }),
})


export const { useGetDefaultMembersQuery, useUpdateDefaultWorkspaceNameMutation } = memberApi;
