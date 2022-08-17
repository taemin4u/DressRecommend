import React, { useEffect, useState } from 'react';
import { useHistory, useSearchParams } from 'react-router-dom';
import { authService, dbService } from '../fbase';

function Auth({ userObj }) {
  const [myTweets, setMyTweets] = useState([]);
  const history = useHistory();
  const onLogout = () => {
    authService.signOut();
    history.push('/');
  };

  /*   const getMyTweets = async () => {
    // where: 필터링을 해줌, 이 경우 로그인한 사람의 트윗만 보여주도록 함
    const tweets = await dbService
      .collection('tweets')
      .where('createdId', '==', userObj.uid)
      .get();
    setMyTweets(tweets.docs.map((doc) => doc.data().text));
  };
 */

  /*   const showMyTweet = async () => {
    setShowTweet((cur) => !cur);
    if (showTweet === true) {
      const tweets = await dbService
        .collection('tweets')
        .where('createdId', '==', userObj.uid)
        .get();
      setMyTweets(tweets.docs.map((doc) => doc.data().text));
    }
  };
 */

  useEffect(() => {
    dbService
      .collection('tweets')
      .where('createdId', '==', userObj.uid)
      .onSnapshot((snapshot) => {
        const tweets = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        setMyTweets(tweets);
      });
  }, []);
  console.log(myTweets);
  return (
    <>
      <button onClick={onLogout}>Log Out</button>
      {myTweets.map((item, index) => (
        <div key={index}>
          {item.url && (
            <img src={item.url} width="50px" height="50px" alt="image" />
          )}
          <h4>{item.text}</h4>
        </div>
      ))}
    </>
  );
}

export default Auth;

//      {myTweets && myTweets.map((item) => <h4 key={item.createdAt}>{item.text}</h4>)}
// {item.url && ()}
