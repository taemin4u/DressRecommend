import React from 'react';
import AuthForm from '../components/AuthForm';
import { authService, firebaseInstance } from '../fbase';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import '../basic.css';

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

const ButtonContainer = styled.div`
  margin-top: 15px;
  border: none;
  display: flex;
  flex-direction: column;

  button[name='google'] {
    background-color: #3b1e1e;
    color: white;
    border-radius: 5px;
    padding: 2px 10px;
  }

  button[name='github'] {
    margin-top: 5px;
    background-color: #3b1e1e;
    color: white;
    border-radius: 5px;
    padding: 2px 10px;
  }
`;

const Button = styled.button`
  border: 0;
  outline: 0;
  cursor: pointer;
  background: none;
  font-size: 20px;
  &:hover {
    transition: transform 0.2s ease-in; // transition 주기
    transform: scale(1.2); // transform
  }
`;

const Title = styled.h1`
  font-size: 50px;
`;

function Auth() {
  const onSocialClick = async (e) => {
    // Continue with Google or Github
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
    <AuthContainer>
      <Title>CatWitter</Title>
      <FontAwesomeIcon icon={faCat} className="catIcon" />
      <AuthForm />
      <ButtonContainer>
        <Button onClick={onSocialClick} name="google">
          <FontAwesomeIcon icon={faGoogle} className="google" /> Sign in with
          Google
        </Button>
        <Button onClick={onSocialClick} name="github">
          <FontAwesomeIcon icon={faGithub} className="github" />
          Sign in with Github
        </Button>
      </ButtonContainer>
    </AuthContainer>
  );
}

export default Auth;

// input의 name은 input 요소의 이름을 명시함
// value를 써줘야 input에 입력이 되는듯. setState를 통해 state를 바꾸고 그것을 value로 가져오기 때문에

// setPersistence: 사용자를 어떻게 기억할 것인지 선택, default은 local
// local: 브라우저 닫아도  user 정보는 저장
// session: 탭이 열려있는 동안에는 유저 정보 기억
// none: 저장 X -> 페이지를 새로고침하면 다시 로그인해야함
