import { createSlice } from "@reduxjs/toolkit"
import { AuthState } from "../../models/Auth";

//login => post {email && password} : token
//register => post {name && password && email && phone && website} : void

export const tokenSlice = createSlice({
    name: 'token',
    initialState: { user: null, token: null } as AuthState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.token = accessToken;
        },
        logOut: (state, action) => {
            state.user = null;
            state.token = null;
        }
    }
})

export const { setCredentials, logOut } = tokenSlice.actions;

export default tokenSlice.reducer;

export const selectCurrentUser = (state: AuthState) => state.user;
export const selectCurrentToken = (state: AuthState) => state.token;
