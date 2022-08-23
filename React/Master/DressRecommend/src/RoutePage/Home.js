import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { dbService, storageService } from '../fabse';
import { getDownloadURL, getStorage, ref, listAll } from '@firebase/storage';
import Board from '../components/Board';

const WeatherContainer = styled.div`
  position: absolute;
  top: 2%;
  left: 90%;
`;

const Wrapper = styled.div`
  display: flex;
`;

const DressContainer = styled.div`
  background-color: yellow;
  display: flex;
  flex-direction: column;
  div {
    width: 300px;
    height: 50%;
    border: 2px solid black;
  }
`;

const Ssibal = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  background-color: ${(props) =>
    props.isDraggingOver
      ? '#3fbcf2'
      : props.isDraggingFromThis
      ? '#189a59'
      : 'blue'};
`;

function Home({ userObj }) {
  //const [dressPile, setDressPile] = useState([]);
  const [dressImages, setDressImages] = useState([]);
  const dressPile = [
    { up: '후드티', down: '청바지' },
    { up: '반팔', down: '빈바지' },
    { up: '후드티', down: '반바지' },
  ];
  const weatherObj = {
    city: '서울',
    temp: '30도',
    weather: '맑음',
  };

  const fileRef = getStorage();
  const listRef = ref(fileRef, 'autumn/');

  const getImages = () => {
    listAll(listRef).then((res) => {
      res.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((url) => {
          setDressImages((oldArr) => [url, ...oldArr]);
        });
      });
    });
  };

  useEffect(() => {
    listAll(listRef).then((res) => {
      res.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((url) => {
          setDressImages((oldArr) => [url, ...oldArr]);
        });
      });
    });
  }, []);
  console.log(dressImages.length);
  const onDragEnd = (info) => {
    const { destination, source, draggableId } = info;
    console.log(info);

    if (!destination) return;
    if (destination.droppableId === source.droppableId) {
      setDressImages((allImage) => {
        const copy = allImage[+draggableId];
        allImage.splice(source.index, 1);
        allImage.splice(destination.index, 0, copy);
        return [...allImage];
      });
    }
  };
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
          <Droppable droppableId="dressing">
            {(magic) => (
              <DressContainer ref={magic.innerRef} {...magic.droppableProps}>
                <div>1</div>
                <div>2</div>
              </DressContainer>
            )}
          </Droppable>
          <Droppable droppableId="dressList" direction="column">
            {(magic, snapshot) => (
              <Ssibal
                ref={magic.innerRef}
                {...magic.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
                isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
              >
                {dressImages.length !== 0
                  ? dressImages.map((item, index) => (
                      <Board key={index} item={item} index={index} />
                    ))
                  : '안나오냐고'}
                {magic.placeholder}
              </Ssibal>
            )}
          </Droppable>
        </Wrapper>

        {/* <div>

        </div> */}
        {/* 유저들이 고른 옷 저장 */}
        <div>
          {dressPile.map((dress, index) => (
            <div key={index}>
              {dress.up}, {dress.down}
            </div>
          ))}
        </div>

        <div>여기에 날씨에 따라 맞는 옷이 나옴</div>
      </DragDropContext>
    </>
  );
}

export default Home;
