import axios from "axios";
import { Post } from "../models/Post";
import { nanoid } from "@reduxjs/toolkit";

const POSTS_URL = 'http://localhost:3500/posts';

export const fetchPosts = async () => {
    try {
        const response = await axios.get(POSTS_URL);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const newPost = async (post: Omit<Post, 'id'>) => {
    try {
        const postComplete = {...post, id: nanoid()};
        const response = await axios.post(POSTS_URL, postComplete);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}