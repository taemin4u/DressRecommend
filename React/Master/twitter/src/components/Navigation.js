import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import '../basic.css';

const Ul = styled.ul`
  list-style: none;
  text-align: center;
  width: 300px;
  margin: 0 auto;
  color: white;
  margin-bottom: 20px;
  margin-top: 30px;
`;

const Li = styled.li`
  margin-bottom: 5px;
  border: 1px solid black;
  background-color: #3b1e1e;
  border-radius: 5px;

  &:hover {
    transition: transform 0.2s ease-in;
    transform: scale(1.2);
  }
`;

function Navigation({ userObj }) {
  return (
    <nav>
      <Ul>
        <Li>
          <Link to="/" className="link">
            Home
          </Link>
        </Li>
        <Li>
          <Link to="profile" className="link">
            {userObj.email}'s Profile
          </Link>
        </Li>
      </Ul>
    </nav>
  );
}
export default Navigation;
