import React, { ChangeEvent, useState } from 'react'
import { useSelector } from 'react-redux';

import { selectAllUsers } from '../users/usersSlice';
import { useNavigate } from 'react-router-dom';
import { useAddNewPostMutation } from './postsSlice';

const AddPostForm = () => {
    const [addNewPost, { isLoading }] = useAddNewPostMutation();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');

    const users = useSelector(selectAllUsers);

    const navigate = useNavigate();

    const onTitleChanged = (e:ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const onContentChanged = (e:ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
    const onAuthorChanged = (e:ChangeEvent<HTMLSelectElement>) => setUserId(e.target.value);

    const canSave = [ title, content, userId ].every(Boolean) && !isLoading;

    const userOptions = users.map(user => (
        <option key={ user.id } value={ user.id }>
            { user && user.name }
        </option>
    ))

    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                await addNewPost({ title, body: content, userId }).unwrap();
                setTitle('')
                setContent('')
                setUserId('')
                navigate('/')
            } catch (err) {
                console.error('Failed to save the post', err)
            }
        }
    }

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input 
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged} 
                />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {userOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea 
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button 
                    onClick={onSavePostClicked} 
                    type='button'
                    disabled={!canSave}
                >Save Post</button>
            </form>
        </section>
    )
}

export default AddPostForm