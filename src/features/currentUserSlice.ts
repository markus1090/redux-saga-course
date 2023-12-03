import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../models/User";
import { RootState } from "../redux/store";

interface initialStateInterface {
    currentUser: User | null
}

const initialState: initialStateInterface = {
    currentUser: null
}

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
        },

        removeCurrentUser: (state) => {
            state.currentUser = null;
        }
    }
})

export default currentUserSlice.reducer;

export const { setCurrentUser, removeCurrentUser } = currentUserSlice.actions;

export const currentUserSelector = (state: RootState) => state.currentUser;