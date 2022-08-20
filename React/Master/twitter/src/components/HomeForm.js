import React, { useState } from 'react';
import { getDownloadURL } from '@firebase/storage';
import { dbService, storageService } from '../fbase';
import { v4 as uuidv4 } from 'uuid'; // user id를 랜덤하게 생성
import styled from 'styled-components';

const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    text-align: center;
  }
`;

const TextContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
`;

function HomeForm({ userObj }) {
  const [myFile, setMyFile] = useState('');
  const [tweet, setTweet] = useState('');
  const onChange = (e) => {
    const value = e.target.value;
    setTweet(value);
  };

  const onFileChange = (e) => {
    const files = e.target.files;
    const theFile = files[0]; // files는 여러 file을 가질 수 있지만 input으로 하나의 파일만 받으므로 [0]
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      // 파일 로딩이 끝나거나 읽기가 끝나면 실행되는 이벤트, 여기선 readAsDataURL이 끝나면 실행
      console.log(finishedEvent);
      setMyFile(finishedEvent.currentTarget.result); // finishedEvent.currentTarget.result에 dataURL이 담김
    };
    reader.readAsDataURL(theFile); // 파일을 읽어오고 그 파일을 문자열로 변환할 수 있다.
  };

  const onClearPhoto = () => setMyFile('');

  const onSubmit = async (e) => {
    let myDataURL = '';
    e.preventDefault();
    if (myFile !== '') {
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`); // 파일에 대한 reference를 생성
      const response = await fileRef.putString(myFile, 'data_url');
      myDataURL = await getDownloadURL(response.ref); // fbase v9에서 stroage에 저장된 파일의 url 얻어오기
    }

    // ref: 구글 클라우드 storage에 대한 참조
    const tweetWithImage = {
      text: tweet,
      createdAt: Date.now(),
      createdId: userObj.uid,
      url: myDataURL,
    };

    await dbService.collection('tweets').add(tweetWithImage);
    setTweet('');
    setMyFile('');
  };
  return (
    <form onSubmit={onSubmit}>
      <TextContainer>
        <input
          type="text"
          placeholder="What is on your mind?"
          maxLength={120}
          value={tweet}
          onChange={onChange}
        />
        <input type="submit" value="Tweet!" />
      </TextContainer>

      <FileContainer>
        <input type="file" accept="image/*" onChange={onFileChange} />
        {myFile && (
          <div>
            <img src={myFile} alt="files" width="50px" height="50px" />
            <button onClick={onClearPhoto}>Clear Photo</button>
          </div>
        )}
      </FileContainer>
    </form>
  );
}

export default HomeForm;
