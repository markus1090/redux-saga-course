import React from 'react'
import { useSelector } from 'react-redux';
import { selectAllPosts, getPostsStatus, getPostsError } from './postsSlice';
import PostExcerpt from './PostExcerpt';

const PostsList = () => {
    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    let content;
    if (postsStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (postsStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a:any,b:any) => b.date.localeCompare(a.date))
        content = orderedPosts.map((post:any, index:number) => <PostExcerpt key={ index } post={post}/>)
    } else if (postsStatus === 'failed') {
        content = <p>{ error }</p>;
    }

    return (
        <section>
            { content }
        </section>
    )
}

export default PostsList