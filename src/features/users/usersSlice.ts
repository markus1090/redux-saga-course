import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from 'axios'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export interface User {
    id: string,
    name: string
}

const initialState: User[] = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(USERS_URL);
    return response.data
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

export const selectAllUsers = (state:RootState) => state.users;
export const selectUserById = (state:any, userId:any) =>
    state.users.find((user:any) => user.id === userId)

export default usersSlice.reducer;