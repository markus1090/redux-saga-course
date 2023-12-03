import { PayloadAction, createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../models/User";
import { RootState } from "../redux/store";

const USERS_URL = 'http://localhost:3500/users';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(USERS_URL);
    return response.data;
})

interface initialStateInterface {
    users: User[],
    status: string,
    error: any
}

const initialState: initialStateInterface = {
    users: [],
    status: 'idle',
    error: null
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<Omit<User, 'id'>>) => {
            state.users.push({ ...action.payload, id: nanoid() });
        }
    }
})

export default usersSlice.reducer;

export const { addUser } = usersSlice.actions;

export const usersSelector = (state: RootState) => state.users;