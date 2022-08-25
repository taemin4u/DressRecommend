import { useEffect, useState } from 'react';
import { authService, dbService } from '../fabse';
import { useNavigate } from 'react-router-dom';

function MyPage({ userObj }) {
  const [myDress, setMyDress] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    dbService
      .collection('dress')
      .where('createdId', '==', userObj.uid)
      .onSnapshot((snapshot) => {
        const dresses = snapshot.docs.map((doc) => ({ ...doc.data() }));
        setMyDress(dresses);
      });
  }, []);

  const onLogout = (e) => {
    authService.signOut();
    navigate('/');
  };
  return (
    <>
      <div>
        <button onClick={onLogout}>로그아웃</button>
        {myDress.map((item, index) => (
          <div key={index}>
            <img src={item.up} width="50px" height="50px" alt="upImage" />
            <img src={item.down} width="50px" height="50px" alt="downImage" />
          </div>
        ))}
      </div>
    </>
  );
}

export default MyPage;
