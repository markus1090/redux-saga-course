import React from 'react'
import { useAddReactionMutation } from '../../features/posts/postsSlice'

const reactionEmoji:any = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '💓',
    rocket: '🚀',
    coffee: '☕'
}

const ReactionButtons = ({ post }:any) => {
    const [addReaction] = useAddReactionMutation();

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji], index) => {
        return (
            <button 
                key={name}
                type='button'
                className='reactionButton'
                onClick={() => {
                    const newValue = post.reactions[name] + 1;
                    addReaction({ postId: post.id, reactions: { ...post.reactions, [name]: newValue } })
                }}>
                    { emoji } { post.reactions[name] }
                </button>
        )
    })

    return (
        <div>{reactionButtons}</div>
    )
}

export default ReactionButtons