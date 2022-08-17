import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from './Navigation';
import Profile from '../routes/Profile';
function DefaultPage({ isLoggedIn, userObj }) {
  console.log('시발', userObj);
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exat path="/profile">
              <Profile userObj={userObj} />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
}

export default DefaultPage;

/*
Route의 exact 속성은 path에 넣은 경로값과 일치할 때만 render되도록 함
path='/'인 라우터는 path='/tmp'에서도 반응하므로
*/

// {isLoggedIn && <Navigation/>} == if(isLoggedIn) {<Navigation /> }
