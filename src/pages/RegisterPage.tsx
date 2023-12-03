import React from 'react'
import FormAuth from '../components/FormAuth';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    return (
        <div className='container-fluid'>
            <h2>Sign Up</h2>
            <FormAuth type='register' />
            <Link to={'/login'}> Are you already registered? go to login</Link>
        </div>
    )
}

export default RegisterPage