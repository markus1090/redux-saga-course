import { PayloadAction, createSlice, nanoid, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { sub } from 'date-fns';
import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
export interface Post {
    id: string, 
    title: string, 
    content: string,
    userId?: string | undefined,
    date?: any,
    reactions: {
        thumbsUp: number,
        wow: number,
        heart: number,
        rocket: number,
        coffee: number
    }
}

export type ReactionPost = Record<emoji, number>

export type emoji = "thumbsUp" | "wow" | "heart" | "rocket" | "coffee";

export interface asyncPost {
    posts: Post[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: any
}

const initialState:any = {
    posts: [],
    status: 'idle',
    error: null,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL)
    return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost:any) => {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
})

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost:any) => {
    const { id } = initialPost;
    try {
        const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
        return response.data
    } catch (err) {
        return initialPost;
    }
})

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost:any) => {
    const { id } = initialPost;
    try {
        const response = await axios.delete(`${POSTS_URL}/${id}`)
        if (response?.status === 200) return initialPost;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err:any) {
        return initialPost;
    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action:PayloadAction<Post>) => {
                state.posts.push(action.payload)
            },
            prepare: (title: string, content: string, userId: string) => {
                return {
                    payload: {
                        id:nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction }: Record<string, emoji> = action.payload;
            const existingPost = state.posts.find((post:any) => post.id === postId);
            if(existingPost) {
                existingPost.reactions[reaction]++;
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                //Adding date and reactions
                let min = 1;
                const loadedPosts = action.payload.map((post:any) => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                });
                // Add any fetched posts to the array
                state.posts = state.posts.concat(loadedPosts);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                const sortedPosts = state.posts.sort((a:any, b:any) => {
                    if (a.id > b.id) return 1
                    if (a.id < b.id) return -1
                    return 0
                })
                action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
                // End fix for fake API post IDs 

                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                console.log(action.payload)
                state.posts.push(action.payload)
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                action.payload.date = new Date().toISOString();
                const posts = state.posts.filter((post:any) => post.id !== id);
                state.posts = [...posts, action.payload];
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const posts = state.posts.filter((post:any) => post.id !== id);
                state.posts = posts;
            })
    }
})

export const selectAllPosts = (state:RootState) => state.posts.posts;
export const getPostsStatus = (state:RootState) => state.posts.status;
export const getPostsError = (state:RootState) => state.posts.error;
export const selectPostById = (state:RootState, postId:number) =>
    state.posts.posts.find((post:any) => post.id === postId)

//memo selector
export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter((post:any) => post.userId === userId)
)

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;