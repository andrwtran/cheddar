import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import logo from '../../images/cheddar-logo-small.png';
import "./auth.css"

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='LoginForm scale-up-center'>
      <img src={logo} alt='' id='LoginImage'></img>
      {errors.length > 0 &&
        <div className='LoginErrors'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
      }
      <form onSubmit={onLogin}>
        <div className='LoginInputs'>
          <div className='LoginEmail'>
            {/* <label htmlFor='email' id='LoginEmailLabel'>Email</label> */}
            <input
              name='email'
              type='text'
              value={email}
              onChange={updateEmail}
              id='LoginEmailInput'
              placeholder='Email'
            />
          </div>
          <div className='LoginPassword'>
            {/* <label htmlFor='password' id='LoginPasswordLabel'>Password</label> */}
            <input
              name='password'
              type='password'
              value={password}
              onChange={updatePassword}
              id='LoginPasswordInput'
              placeholder='Password'
            />
          </div>
        </div>
        <div id="LoginButtons">
          <span className='LoginButton'>
            <button type='submit'>Login</button>
          </span>
          <span className='DemoButton'>
            <button type='submit'
              onClick={() => {
              setEmail("demo@aa.io");
              setPassword("password");
              }}
            >
            Demo
            </button>
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
