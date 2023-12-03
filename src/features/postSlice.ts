import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";
import { Post } from "../models/Post";
import { nanoid } from "@reduxjs/toolkit";

interface initialStateInterface {
    posts: Post[],
}

const initialState: initialStateInterface = {
    posts: [],
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: {
            prepare: ({ title, body }: Omit<Post, 'id'>) => {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        body
                    }
                }
            },
            reducer: (state, action: PayloadAction<Post>) => {
                state.posts.push(action.payload);
            },
        },
        setListPosts: (state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload;
        }
    }
})

export default postsSlice.reducer;

export const { addPost, setListPosts } = postsSlice.actions;

export const selectAllPosts = (state:RootState) => state.posts.posts;

export const postsSelector = (state: RootState) => state.posts;