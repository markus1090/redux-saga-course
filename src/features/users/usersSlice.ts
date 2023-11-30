import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { User } from "../../models/User";
import { RootState } from "../../app/store";

const usersAdapter = createEntityAdapter({
    sortComparer: (a:User, b:User) => b.name.localeCompare(a.name)
})

const initialState = usersAdapter.getInitialState();

export const extendedApiUserSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            transformResponse: (responseData: User[]) => {
                console.log(responseData)
                const loadedUsers = responseData.map((user:User) => {
                    return user;
                });
                return usersAdapter.setAll(initialState, loadedUsers)
            },
        })
    })
})

export const { useGetUsersQuery } = extendedApiUserSlice;

export const selectUsersResult = extendedApiUserSlice.endpoints.getUsers.select('')

const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data // normalized state object with ids & entities
)

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
    // Pass in a selector that returns the posts slice of state
} = usersAdapter.getSelectors((state:RootState) => selectUsersData(state) ?? initialState)