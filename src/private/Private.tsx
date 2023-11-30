import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import PostsList from './pages/PostsList'
import AddPostForm from './pages/AddPostForm'
import SinglePostPage from './pages/SinglePostPage'
import EditPostForm from './pages/EditPostForm'
import UsersList from './pages/UserList'
import UserPage from './pages/UserPage'
import ErrorPage from '../public/pages/ErrorPage'

const Private = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<PostsList />} />
                <Route path='posts/*'>
                    <Route index element={<AddPostForm />} />
                    <Route path=':postId' element={<SinglePostPage />} />
                    <Route path='edit/:postId' element={<EditPostForm />} />
                </Route>
                <Route path='users/*'>
                    <Route index element={<UsersList />} />
                    <Route path=':userId' element={<UserPage />} />
                </Route>
            </Route>
            <Route path='*' element={<ErrorPage />} />
        </Routes>
    )
}

export default Private