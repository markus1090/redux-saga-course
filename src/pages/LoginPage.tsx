import React from 'react'
import FormAuth from '../components/FormAuth'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <div className='container-fluid'>
      <h2>Sign In</h2>
      <FormAuth type='login' />
      <Link to={'/register'}> Sign up! </Link>
    </div>
  )
}

export default LoginPage