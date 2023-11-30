import { useSelector } from 'react-redux'
import { selectUserById } from '../../features/users/usersSlice'
import { Link, useParams } from 'react-router-dom'
import { useGetPostsByUserIdQuery } from '../../features/posts/postsSlice'
import { RootState } from '../../app/store'

const UserPage = () => {
    const { userId } = useParams()
    const user = useSelector((state:RootState) => selectUserById(state, Number(userId)))

    const {
        data: postsForUser,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsByUserIdQuery(userId);

    let content;
    if(isLoading) {
        content = <p>Loading...</p>
    } else if(isSuccess) {
        const { ids, entities } = postsForUser;
        content = ids.map((id:any) => (
            <li key={id}>
                <Link to={`/private/posts/${id}`}>{ entities[id]!.title }</Link>
            </li>
        ))
    } else if(isError) {
        content = <p>{ error as any }</p>
    }

    return (
        <section>
            <h2>{user?.name}</h2>

            <ol>{ content }</ol>
        </section>
    )
}

export default UserPage