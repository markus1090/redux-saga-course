import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/counter/counterSlice';
import postsReducer from '../features/posts/postsSlice';
import userReducer from '../features/users/usersSlice';

const rootReducer = combineReducers({
    counter: counterReducer,
    posts: postsReducer,
    users: userReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>;