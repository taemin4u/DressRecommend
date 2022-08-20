import DefaultPage from './components/DefaultPage';
import React, { useEffect, useState } from 'react';
import { authService } from './fabse';

function App() {
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
  }, []);
  return (
    <>
      {init ? (
        <DefaultPage isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        '불러오는중...'
      )}
    </>
  );
}

export default App;
