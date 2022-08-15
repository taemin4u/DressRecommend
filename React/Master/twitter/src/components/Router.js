import React, { useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';

function DefaultPage({ isLoggedIn }) {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home />
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
