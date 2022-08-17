import DefaultPage from './Router';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { authService } from '../fbase';

function App() {
  // 로그인이나 가입을 해도 currentUser을 받아오는 시간때문에 null로 나옴 -> 다른 방법 필요
  // firebase가 시작되기 전에 authService를 사용해서 그렇다는 느낌
  // 로그인을 하거나 create Account를 해야 firebase가 시작됨

  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, [userObj]); // 페이지가 시작될 때 한 번 실행
  console.log(userObj);
  return (
    <>
      {init ? (
        <DefaultPage isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        'Initializing...'
      )}
    </>
  );
}

export default App;
export {};
