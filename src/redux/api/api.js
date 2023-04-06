// Need to use the React-specific entry point to import createApi
// import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query';rr
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints

const URL = 'https://kt-guru-server.onrender.com/';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: URL}),
  endpoints: build => ({
    signUpApi: build.mutation({
      query: args => {
        // console.log(args, 'args');
        return {
          url: `signup`,
          method: 'POST',
          body: args,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        };
      },
    }),
    loginApi: build.mutation({
      query: args => {
        // console.log(args, 'args');
        return {
          url: `login`,
          method: 'POST',
          body: args,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        };
      },
    }),

    resetpassword: build.mutation({
      query: args => {
        // console.log(args, 'args');
        return {
          url: `resetpassword`,
          method: 'POST',
          body: args,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        };
      },
    }),

    me: build.mutation({
      query: token => {
        // console.log(token, 'token');
        return {
          url: `me`,
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),

    updateprofile: build.mutation({
      query: args => {
        // console.log(args, 'formData');
        console.log(args, 'argumnets');
        return {
          url: `updateprofile`,
          method: 'POST',
          body: args.inputFormData,
          headers: {
            'Content-type': 'multipart/form-data; charset=UTF-8',
            Authorization: `Bearer ${args.token}`,
          },
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginApiMutation,
  useMeMutation,
  useResetpasswordMutation,
  useUpdateprofileMutation,
  useSignUpApiMutation,
} = api;
