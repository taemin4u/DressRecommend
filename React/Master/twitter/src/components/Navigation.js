import React from 'react';
import { Link } from 'react-router-dom';

function Navigation({ userObj }) {
  console.log('nav', userObj);
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="profile">{userObj.email}'s Profile</Link>
        </li>
      </ul>
    </nav>
  );
}
export default Navigation;
