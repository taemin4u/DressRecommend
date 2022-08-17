import React, { useState } from 'react';
import styled from 'styled-components';
import { authService } from '../fbase';
import '../basic.css';

const AuthFormContainer = styled.form`
  display: flex;
  flex-direction: column;

  input {
    font-size: 24px;
    text-align: center;
    border: none;
  }

  input:nth-child(1) {
    margin-bottom: 1px;
  }

  input[type='submit']:disabled {
    cursor: default;
  }

  input[type='submit'] {
    margin-top: 10px;
    border: 0;
    outline: 0;
    cursor: pointer;
  }
`;

const ToggleMode = styled.button`
  cursor: pointer;
  margin-top: 5px;
  background-color: white;
  border: none;
`;

function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');
  const onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (newAccount) {
        // 계정 생성
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        // 로그인
        await authService.signInWithEmailAndPassword(email, password);
      }
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => {
    setNewAccount((cur) => !cur);
    setError('');
  };
  return (
    <>
      <AuthFormContainer onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? 'Create Account' : 'Log In'}
          disabled={email ? (password ? false : true) : true}
        />
        {error ? window.alert(`${error}`) : null}
      </AuthFormContainer>
      <ToggleMode onClick={toggleAccount}>
        {newAccount ? 'Sign in Mode' : 'Log In Mode'}
      </ToggleMode>
    </>
  );
}

export default AuthForm;
