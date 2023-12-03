import React, { FC } from 'react'
import { PostFC } from '../models/Post'

const PostComponent: FC<Partial<PostFC>> = ({ title, body }) => {
    return (
        <div>
            <h5>{ title || '' }</h5>
            <p>{ body || '' }</p>
        </div>
    )
}

export default PostComponent