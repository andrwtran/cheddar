import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import logo from '../../images/cheddar-logo-small.png';
import "./auth.css"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const user = useSelector(state => state.session.user);

  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors([ "password : Passwords must match." ])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='SignUpForm scale-up-center'>
      <img src={logo} alt=''></img>
      {errors.length > 0 &&
        <div className='SignUpErrors'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
      }
      <form onSubmit={onSignUp}>
        <div className='SignUpUserName'>
          {/* <label id='SignUpUserNameLabel'>Username</label> */}
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            id='SignUpUserNameInput'
            placeholder='Username'
          ></input>
        </div>
        <div className='SignUpEmail'>
          {/* <label id='SignUpEmailLabel'>Email</label> */}
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            id='SignUpEmailInput'
            placeholder='Email'
          ></input>
        </div>
        <div className='SignUpPassword'>
          {/* <label id='SignUpPasswordLabel'>Password</label> */}
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            id='SignUpPasswordInput'
            placeholder='Password'
          ></input>
        </div>
        <div className='SignUpRepeatPassword'>
          {/* <label id='SignUpRepeatPasswordLabel'>Password</label> */}
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            id='SignUpRepeatPasswordInput'
            placeholder='Password'
          ></input>
        </div>
        <div className='SignUpButton'>
          <button type='submit'>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
