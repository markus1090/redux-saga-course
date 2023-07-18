import React from 'react';
import './App.css';
import Counter from './features/counter/Counter';
import PostsList from './features/posts/PostsList';
import AddPostForm from './features/posts/AddPostForm';
import EditPostForm from './features/posts/EditPostForm';
import SinglePostPage from './features/posts/SinglePostPage';
import Layout from './components/Layout';
import { Routes, Route, Navigate } from 'react-router-dom';
import UsersList from './features/users/UserList';
import UserPage from './features/users/UserPage';

//https://www.youtube.com/watch?v=NqzdVN2tyvQ   da riprendere 3 parte con redux thunk

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Layout /> }>
          <Route index element={ <PostsList /> } />
          <Route path='post'>
            <Route index element={ <AddPostForm /> } />
            <Route path=':postId' element={ <SinglePostPage />} />
            <Route path='edit/:postId' element={ <EditPostForm />} />
          </Route>
          <Route path='user'>
            <Route index element={<UsersList />} />
            <Route path=':userId' element={<UserPage />} />
          </Route>
        </Route>
        <Route path='*' element={ <Navigate to={'/'} replace />}/>
      </Routes>    
    </div>
  );
}

export default App;
