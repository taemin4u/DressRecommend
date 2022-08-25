import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { dbService, storageService } from '../fabse';
import { getDownloadURL, getStorage, ref, listAll } from '@firebase/storage';
import Board from '../components/Board';
import { v4 as uuidv4 } from 'uuid';

const WeatherContainer = styled.div`
  position: absolute;
  top: 2%;
  left: 90%;
`;

const UpWrapper = styled.div`
  display: flex;
`;

const DownWrapper = styled.div`
  display: flex;
`;

const DressContainer = styled.div`
  background-color: yellow;
  width: 300px;
`;

const Upper = styled.div`
  display: flex;
  background-color: ${(props) =>
    props.isDraggingOver
      ? '#3fbcf2'
      : props.isDraggingFromThis
      ? '#189a59'
      : 'blue'};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

function Home({ userObj }) {
  //const [dressPile, setDressPile] = useState([]);
  const [upDress, setUpDress] = useState([]);
  const [downDress, setDownDress] = useState([]);
  const [upDressSave, setUpDressSave] = useState('');
  const [downDressSave, setDownDressSave] = useState('');
  const [dressPile, setDressPile] = useState([]);

  const weatherObj = {
    city: '서울',
    temp: '30도',
    weather: '맑음',
  };

  const fileRef = getStorage();
  const listRef = ref(fileRef, 'autumn/');

  const upRef = ref(fileRef, 'autumn/up/');
  const downRef = ref(fileRef, 'autumn/down/');
  useEffect(() => {
    listAll(upRef).then((res) => {
      res.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((url) => {
          setUpDress((oldArr) => [url, ...oldArr]);
        });
      });
    });
  }, []);

  useEffect(() => {
    listAll(downRef).then((res) => {
      res.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((url) => {
          setDownDress((oldArr) => [url, ...oldArr]);
        });
      });
    });
  }, []);
  const onDragEnd = (info) => {
    const { destination, source, draggableId } = info;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.droppableId === 'upDressList'
    ) {
      setUpDress((allImage) => {
        const copy = allImage[+draggableId];
        allImage.splice(source.index, 1);
        allImage.splice(destination.index, 0, copy);
        return [...allImage];
      });
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.droppableId === 'downDressList'
    ) {
      setDownDress((allImage) => {
        const copy = allImage[+draggableId - 2];
        allImage.splice(source.index - 2, 1);
        allImage.splice(destination.index - 2, 0, copy);
        return [...allImage];
      });
    }

    if (destination.droppableId === 'upDressing') {
      const copy = upDress[+draggableId];
      setUpDressSave(copy);
    }

    if (destination.droppableId === 'downDressing') {
      const copy = downDress[+draggableId - 2];
      setDownDressSave(copy);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (upDressSave !== '' && downDressSave !== '') {
      const upDressDB = upDressSave;
      const downDressDB = downDressSave;

      const saveAtDB = {
        up: upDressDB,
        down: downDressDB,
        createdAt: Date.now(),
        createdId: userObj.uid,
      };

      await dbService.collection('dress').add(saveAtDB);
      setUpDressSave('');
      setDownDressSave('');
    } else {
      window.prompt('모든 옷을 드래그 하세요');
    }
  };

  useEffect(() => {
    dbService.collection('dress').onSnapshot((snapshot) => {
      const dressArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDressPile(dressArr);
    });
  }, []);

  return (
    <>
      {/* Weather Description */}
      <WeatherContainer>
        <h4>현재 위치: {weatherObj.city}</h4>
        <h4>현재 온도: {weatherObj.temp}</h4>

        <h4>현재 날씨: {weatherObj.weather}</h4>
      </WeatherContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <form onSubmit={onSubmit}>
            <UpWrapper>
              <Droppable droppableId="upDressing">
                {(magic) => (
                  <DressContainer
                    ref={magic.innerRef}
                    {...magic.droppableProps}
                  >
                    <div>
                      {upDressSave ? (
                        <img src={upDressSave} alt="save" />
                      ) : null}
                    </div>
                    {magic.placeholder}
                  </DressContainer>
                )}
              </Droppable>
              <Droppable droppableId="upDressList" direction="column">
                {(magic, snapshot) => (
                  <Upper
                    ref={magic.innerRef}
                    {...magic.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                    isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                  >
                    {upDress.length !== 0
                      ? upDress.map((item, index) => (
                          <Board key={index} item={item} index={index} />
                        ))
                      : '안나오냐고'}
                    {magic.placeholder}
                  </Upper>
                )}
              </Droppable>
            </UpWrapper>
            <DownWrapper>
              <Droppable droppableId="downDressing">
                {(magic) => (
                  <DressContainer
                    ref={magic.innerRef}
                    {...magic.droppableProps}
                  >
                    <div>
                      {downDressSave ? (
                        <img src={downDressSave} alt="downDress" />
                      ) : null}
                    </div>
                    {magic.placeholder}
                  </DressContainer>
                )}
              </Droppable>
              <Droppable droppableId="downDressList" direction="column">
                {(magic, snapshot) => (
                  <Upper
                    ref={magic.innerRef}
                    {...magic.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                    isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                  >
                    {downDress.length !== 0
                      ? downDress.map((item, index) => (
                          <Board key={index} item={item} index={index + 2} />
                        ))
                      : '안나오냐고'}
                    {magic.placeholder}
                  </Upper>
                )}
              </Droppable>
            </DownWrapper>
            <input type="submit" value="제출" />
          </form>
        </Wrapper>
        {/* <div>
        draggableid, index는 유일해야함
        </div> */}
        {/* 유저들이 고른 옷 저장 */}

        <div>
          {dressPile.map((dress, index) => (
            <div key={index}>
              <h4>{userObj.email}'s Dress</h4>
              <img src={dress.up} width="50px" height="50px" alt="upImage" />
              <img src={dress.down} width="50px" height="50px" alt="upImage" />
            </div>
          ))}
        </div>

        <div>여기에 날씨에 따라 맞는 옷이 나옴</div>
      </DragDropContext>
    </>
  );
}

export default Home;
