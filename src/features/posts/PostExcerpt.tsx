import React from 'react'
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import { Link } from 'react-router-dom';

export const PostExcerpt = React.memo(({ post }: any) => {
    return (
        <article>
            <h2>{post.title}</h2>
            <p>{post.body && post.body.substring(0, 75)}...</p>
            <p>
                <Link to={`post/${post.id}`}>View Post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    )
})

export default PostExcerpt