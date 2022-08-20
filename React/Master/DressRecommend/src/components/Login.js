import React, { useState } from 'react';
import { authService } from '../fabse';

function Login() {
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
    e.preventDefault(); // submit시 페이지 새로고침 막음

    try {
      if (newAccount) {
        // 계정 생성
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        await authService.signInWithEmailAndPassword(email, password);
      }
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = (e) => {
    setNewAccount((cur) => !cur);
    setError('');
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <h1>Recommend Dress by Weather</h1>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="이메일"
          required
          value={email}
          onChange={onChange}
        ></input>
        <input
          name="password"
          type="text"
          placeholder="패스워드"
          required
          value={password}
          onChange={onChange}
        ></input>
        <input
          type="submit"
          value={newAccount ? '계정 생성' : '로그인'}
          disabled={email ? (password ? false : true) : true}
        ></input>
        <span>{error ? `${error}` : null}</span>
      </form>
      <button onClick={toggleAccount}>
        {newAccount ? '계정 생성 모드' : '로그인 모드'}
      </button>
    </>
  );
}

export default Login;
