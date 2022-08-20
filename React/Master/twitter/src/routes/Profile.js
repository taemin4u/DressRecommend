import React, { useEffect, useState } from 'react';
import { useHistory, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { authService, dbService } from '../fbase';

const LogoutBtn = styled.button`
  display: block;
  text-align: center;
  width: 100px;
  margin: 0 auto;
  border: 0;
  border-radius: 5px;
  background-color: #3b1e1e;
  color: white;
  margin-bottom: 30px;

  &:hover {
    transform: scale(1.2);
    transition: transform 0.2s ease-in;
    cursor: pointer;
  }
`;

const TweetsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const TweetContainer = styled.div`
  margin-bottom: 5px;
  background-color: white;
  border-radius: 3px;
  border: 1px solid black;
  width: 500px;
  display: flex;
  justify-content: space-evenly;
  margin: 0 auto;
`;

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
      <LogoutBtn onClick={onLogout}>Log Out</LogoutBtn>
      <TweetsContainer>
        {myTweets.map((item, index) => (
          <TweetContainer key={index}>
            {item.url && (
              <img src={item.url} width="50px" height="50px" alt="image" />
            )}
            <h4>{item.text}</h4>
          </TweetContainer>
        ))}
      </TweetsContainer>
    </>
  );
}

export default Auth;

//      {myTweets && myTweets.map((item) => <h4 key={item.createdAt}>{item.text}</h4>)}
// {item.url && ()}
