import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { addPost } from '../features/postSlice';
import { newPost } from '../api/posts';
import ToastGeneric from './ToastGeneric';

const FormAddPost = () => {
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');

    const submit = async () => {
        if(title && body) {
            const res = newPost({title, body})
            dispatch(addPost(await res));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            },2000)
        }
        setTitle('');
        setBody('');
    }

    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title Post</Form.Label>
                    <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} type="title" placeholder="insert title" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Content</Form.Label>
                    <Form.Control value={body} onChange={(e) => setBody(e.target.value)} as="textarea" rows={3} />
                </Form.Group>
                <Button variant="primary" disabled={!(Boolean(title) && Boolean(body))} onClick={submit}>Add</Button>
            </Form>
            <ToastGeneric title='Success' type='Success' content='Post added successfully' show={showToast} />
        </>
    )
}

export default FormAddPost