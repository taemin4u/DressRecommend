import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';
import Home from '../RoutePage/Home';
import Main from '../RoutePage/Main';
import Mypage from '../RoutePage/Mypage';
function DefaultPage({ isLoggedIn, userObj }) {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route path="/mypage" element={<Mypage userObj={userObj} />} />
          </>
        ) : (
          <Route path="/" element={<Main />} />
        )}
      </Routes>
    </Router>
  );
}

export default DefaultPage;
