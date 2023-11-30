import React, { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSignInQuery } from '../../features/auth/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    isLoading,
    isSuccess,
    isError,
    error
} = useSignInQuery('')

  const onEmailChanged = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onPasswordChanged = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const canSignIn = [email, password].every(Boolean);

  const handleSubmit = () => {}

  return (
    <>
      <section>
        <h2>Login</h2>
        <form>
          <label htmlFor="loginEmail">Email</label>
          <input
            type="text"
            id="loginEmail"
            name="loginEmail"
            value={email}
            onChange={onEmailChanged}
          />
          <label htmlFor="loginPassword">Password</label>
          <input
            type="text"
            id="loginPassword"
            name="loginPassword"
            value={password}
            onChange={onPasswordChanged}
          />
          <button
            onClick={handleSubmit}
            type='button'
            disabled={!canSignIn}
          >Submit</button>
        </form>
      </section>
      <p>You 'are not register</p>
      <Link to="/register">go to register</Link>
    </>
  )
}

export default Login