import React, { useState } from 'react';
import styled from 'styled-components';
import { dbService, storageService } from '../fbase';

const DivLine = styled.hr`
  background-color: black;
  border: 0;
  height: 2px;
`;

function Tweet({ tweetObj, isOwner, email }) {
  if (!email) {
    email = 'Anonymous';
  }
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const onDeleteClick = () => {
    const check = window.confirm('트윗을 삭제하시겠습니까?');
    if (check) {
      // Delete
      dbService.doc(`tweets/${tweetObj.id}`).delete(); // firestore 삭제
      storageService.refFromURL(tweetObj.url).delete(); // storage 삭제
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = (e) => {
    e.preventDefault();
    dbService.doc(`tweets/${tweetObj.id}`).update({
      text: newTweet,
    });
    setEditing(false);
  };

  const onChange = (e) => {
    const value = e.target.value;
    setNewTweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your Tweet"
              value={newTweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Tweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>
            {tweetObj.text} - by {email}
          </h4>
          {tweetObj.url && (
            <img src={tweetObj.url} width="50px" height="50px" alt="myimage" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Tweet</button>
              <button onClick={toggleEditing}>Edit Tweet</button>
              <DivLine></DivLine>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Tweet;
