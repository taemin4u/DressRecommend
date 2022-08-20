import React, { useEffect } from 'react';
import { useState } from 'react';
import Tweet from '../components/Tweet';
import { dbService } from '../fbase';
import HomeForm from '../components/HomeForm';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Auth({ userObj }) {
  const [tweetPile, setTweetPile] = useState([]);

  // 이렇게 하면 real-time일 때 이전 것도 계속 같이 읽어옴
  // const getTweets = async () => {
  //   const data = await dbService.collection('tweets').get();
  //   data.map((doc) => {
  //     const tweetObj = {
  //       ...doc.data(),
  //       id: doc.id,
  //     };
  //     setTweetPile((prev) => [tweetObj, ...prev]);
  //   });
  // };
  console.log(userObj);
  useEffect(() => {
    // async를 사용하기 위해 따로 선언하고 useEffect 내에서 그것을 다시 호출
    dbService
      .collection('tweets')
      //.orderBy('createdAt', 'desc') // orderBy 땜에 firebase에서 생성한 것은 실시간으로 반영안됨, 반영되게 할려면 createdAt 프로퍼티를 명시적으로 줘야함
      .onSnapshot((snapshot) => {
        // Real-time으로 읽어옴
        const tweetArr = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTweetPile(tweetArr);
      });
  }, []);
  // 위에서 여기처럼 일일이 배열을 새로 만들어 setTweetPile 해줘도 되지만, snapshot을 사용하면 렌더를 새로 생긴것만 해준다고함

  return (
    <Container>
      <HomeForm userObj={userObj} />
      <div>
        {/* snapshot을 log 찍어보면 id 프로퍼티가 있음 */}
        {tweetPile.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.createdId === userObj.uid}
            email={userObj.email}
          />
        ))}
      </div>
    </Container>
  );
}

export default Auth;

/*
forEach는 결과값을 리턴하지 않아서 render을 할 수 없음 (컴포넌트를 출력할 수 없음)
-> tweetPile.map쓰는 이유
*/
