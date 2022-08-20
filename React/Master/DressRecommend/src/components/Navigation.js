import { Link } from 'react-router-dom';

function Navigation({ userObj }) {
  console.log(userObj);

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="mypage">{userObj.email}`s Page </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navigation;
