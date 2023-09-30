import { api } from "./api";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (body) => ({
                url: `/auth/signup`,
                method: "POST",
                body
            }),

            invalidatesTags: ["auth"]
        }),

        login: builder.mutation({
            query: (body) => ({
                url: `/auth/login`,
                method: "POST",
                body
            }),
            
            invalidatesTags: ["auth"]
        }),
    }),
    overrideExisting: false,
});

export const { useSignupMutation, useLoginMutation } = authApi;