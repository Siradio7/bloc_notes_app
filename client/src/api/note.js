import { api } from "./api";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        addNote: builder.mutation({
            query: (body) => ({
                url: `/notes`,
                method: "POST",
                body
            }),

            invalidatesTags: ["notes"]
        }),

        getNotes: builder.query({
            query: () => ({
                url: `/notes`,
                method: "GET"
            }),

            providesTags: ["notes"]
        }),

        updateNote: builder.mutation({
            query: (body) => ({
                url: `/notes/${body.id}`,
                method: "PATCH",
                body
            }),

            invalidatesTags: ["notes"]
        }),

        deleteNote: builder.mutation({
            query: (id) => ({
                url: `/notes/${id}`,
                method: "DELETE"
            }),

            invalidatesTags: ["notes"]
        }),
    }),

    overrideExisting: false
})

export const { useAddNoteMutation, useGetNotesQuery, useUpdateNoteMutation, useDeleteNoteMutation } = authApi