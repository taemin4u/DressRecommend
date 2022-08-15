import React, { useState } from 'react';
import { authService, firebaseInstance } from '../fbase';

function Auth() {
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
    let data;
    try {
      if (newAccount) {
        // 계정 생성
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        // 로그인
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((cur) => !cur);

  const onSocialClick = async (e) => {
    const name = e.target.name;
    let provider;
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
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
        <input type="submit" value={newAccount ? 'Create Account' : 'Log In'} />
        {error}
      </form>
      <span onClick={toggleAccount}>{newAccount ? 'Sign in' : 'Log In'}</span>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
}

export default Auth;

// input의 name은 input 요소의 이름을 명시함
// value를 써줘야 input에 입력이 되는듯. setState를 통해 state를 바꾸고 그것을 value로 가져오기 때문에

// setPersistence: 사용자를 어떻게 기억할 것인지 선택, default은 local
// local: 브라우저 닫아도  user 정보는 저장
// session: 탭이 열려있는 동안에는 유저 정보 기억
// none: 저장 X -> 페이지를 새로고침하면 다시 로그인해야함
