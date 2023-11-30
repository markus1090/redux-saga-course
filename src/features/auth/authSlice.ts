import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { User } from "../../models/User";

export interface userLogin {
    email: string,
    password: string
}

const authAdapter = createEntityAdapter();

const initialState = authAdapter.getInitialState()

export const extendedApiAuthSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signIn: builder.query({
            query: (email) => '/users',
            transformResponse: (responseData: User[]) => {
                console.log(responseData);
            },
        })
    })
})

export const { useSignInQuery } = extendedApiAuthSlice;