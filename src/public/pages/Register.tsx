import React, { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  
  const onNameChanged = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const onEmailChanged = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onPasswordChanged = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const onPhoneChanged = (e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value);
  const onWebSiteChanged = (e: ChangeEvent<HTMLInputElement>) => setWebsite(e.target.value);

  const canSignUp = [name, email, password, phone, website].every(Boolean);

  const signUp = () => {
    return;
  }

  return (
    <>
      <section>
        <h2>Register</h2>
        <form>
          <label htmlFor="loginEmail">Name</label>
          <input
            type="text"
            id="registerName"
            name="registerName"
            value={name}
            onChange={onNameChanged}
          />
          <label htmlFor="loginEmail">Email</label>
          <input
            type="text"
            id="registerUsername"
            name="registerUsername"
            value={email}
            onChange={onEmailChanged}
          />
          <label htmlFor="loginEmail">Password</label>
          <input
            type="text"
            id="registerPassword"
            name="registerPassword"
            value={password}
            onChange={onPasswordChanged}
          />
          <label htmlFor="loginEmail">Phone</label>
          <input
            type="text"
            id="loginEmail"
            name="loginEmail"
            value={phone}
            onChange={onPhoneChanged}
          />
          <label htmlFor="loginEmail">Website</label>
          <input
            type="text"
            id="loginEmail"
            name="loginEmail"
            value={website}
            onChange={onWebSiteChanged}
          />
          <button
            onClick={signUp}
            type='button'
            disabled={!canSignUp}
          >Submit</button>
        </form>
      </section>
      <p>You already register?</p>
      <Link to="/login">go to login</Link>
    </>
  )
}

export default Register