import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectAllPosts, setListPosts } from '../features/postSlice';
import FormAddPost from '../components/FormAddPost';
import PostComponent from '../components/PostComponent';
import { fetchPosts } from '../api/posts';

const PostList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts);

    const setPosts = useCallback(async () => {
        dispatch(setListPosts(await fetchPosts()));
    },[dispatch])

    useEffect(() => {
        setPosts()
    }, [setPosts])

    return (
        <div>
            <div>
                <h2>Add Post</h2>
                <FormAddPost />
            </div>
            <h2>PostList</h2>
            {
                posts ? posts?.map((elem) => {
                    return <PostComponent key={elem.id} title={elem.title} body={elem.body} />
                }) : <p>Loading</p>
            }
        </div>
    )
}

export default PostList