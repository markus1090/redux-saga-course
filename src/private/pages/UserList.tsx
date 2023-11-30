import { useSelector } from 'react-redux'
import { selectAllUsers, useGetUsersQuery } from '../../features/users/usersSlice'
import { Link } from 'react-router-dom'

const UsersList = () => {
    const {
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('')

    const orderedPostIds = useSelector(selectAllUsers)

    let content;
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess) {
        content = orderedPostIds.map((user:any) => (
            <li key={user.id}>
                <Link to={`/private/users/${user.id}`}>{user.name}</Link>
            </li>
        ))
    } else if (isError) {
        content = <p>{ error as any }</p>
    }

    return (
        <section>
            <h2>Users</h2>

            <ul>{ content }</ul>
        </section>
    )
}

export default UsersList