import React from 'react'
import { useDispatch } from 'react-redux'
import { Post, emoji, reactionAdded } from './postsSlice'

const reactionEmoji:Record<emoji, string> = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '💓',
    rocket: '🚀',
    coffee: '☕'
}

type Props = {
    post:Post
}

const ReactionButtons = ({ post }:Props) => {
    const dispatch = useDispatch();

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji], index) => {
        return (
            <button 
                key={name}
                type='button'
                className='reactionButton'
                onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name}))}
                >{emoji} {Object.entries(post.reactions)[index]}</button>
        )
    })

    return (
        <div>{reactionButtons}</div>
    )
}

export default ReactionButtons