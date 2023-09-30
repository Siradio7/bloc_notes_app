import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'https://bloc-notes-app.onrender.com'}),
    tagTypes: ['auth', 'notes'],
    endpoints: () => ({})
});