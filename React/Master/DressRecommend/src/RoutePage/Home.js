import { useState } from 'react';
import styled from 'styled-components';

const WeatherContainer = styled.div`
  position: absolute;
  top: 2%;
  left: 90%;
`;

function Home({ userObj }) {
  //const [dressPile, setDressPile] = useState([]);
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
  return (
    <>
      {/* Weather Description */}
      <WeatherContainer>
        <h4>현재 위치: {weatherObj.city}</h4>
        <h4>현재 온도: {weatherObj.temp}</h4>
        <h4>현재 날씨: {weatherObj.weather}</h4>
      </WeatherContainer>

      <form>
        <div>여기에 옷을 드래그함</div>
      </form>
      {/* 유저들이 고른 옷 저장 */}
      <div>
        {dressPile.map((dress, index) => (
          <div key={index}>
            {dress.up}, {dress.down}
          </div>
        ))}
      </div>

      <div>여기에 날씨에 따라 맞는 옷이 나옴</div>
    </>
  );
}

export default Home;
