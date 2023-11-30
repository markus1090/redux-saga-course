import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { selectAllUsers } from '../../features/users/usersSlice'
import { Link } from 'react-router-dom'

type Props = {
    userId: string | undefined
}

const PostAuthor = ({ userId }:Props) => {
    const users = useSelector(selectAllUsers);
    const author = users.find(user => String(user.id) === String(userId))
    return <span>by 
        { author
            ? <Link to={`/private/users/${userId}`}>{author?.name}</Link>
            : 'Unknown author' }
    </span>
}

export default PostAuthor