import React from 'react'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector'
import { selectAllUsers } from '../users/usersSlice'

type Props = {
    userId: string | undefined
}

const PostAuthor = ({ userId }:Props) => {
    const users = useSelector(selectAllUsers);
    const author = users.find(user => user.id === userId)
    return <span>by { author ? author.name : 'Unknown author' }</span>
}

export default PostAuthor