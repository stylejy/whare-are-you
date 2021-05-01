import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import GoogleMapReact from 'google-map-react';
import Marker from 'react-spinners/PuffLoader';
import short from 'short-uuid';
import useWebSocket from 'react-use-websocket';
import reset from 'styled-reset';
import styled, { createGlobalStyle } from 'styled-components';

const socketUrl = 'wss:test.net';

const MarkerComponent = ({ lat, lng }: { lat: number; lng: number }) => (
  <Marker color="#4A90E2" loading size={20} />
);

const SharingNavComponent = ({
  sharingId,
  sharingButtonHandler,
  cancelButtonHandler,
}: {
  sharingId: string;
  sharingButtonHandler: () => void;
  cancelButtonHandler: () => void;
}) => (
  <>
    <li>공유 ID: {sharingId}</li>
    <button onClick={cancelButtonHandler}>공유취소</button>
  </>
);

const MonitoringNavComponent = ({
  monitoringId,
  isStarted,
  inputChangeHandler,
  startButtonHandler,
  cancelButtonHandler,
}: {
  monitoringId: string;
  isStarted: boolean;
  inputChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  startButtonHandler: () => void;
  cancelButtonHandler: () => void;
}) => {
  if (isStarted && monitoringId) {
    return (
      <>
        <li>공유 ID ( {monitoringId} ) 의 동선을 트래킹 중입니다. </li>
        <button onClick={cancelButtonHandler}>돌아가기</button>
      </>
    );
  }
  return (
    <>
      <li>공유 ID를 입력해주세요: </li>
      <input value={monitoringId} onChange={inputChangeHandler} />
      <button onClick={startButtonHandler}>모니터 시작</button>
      <button onClick={cancelButtonHandler}>돌아가기</button>
    </>
  );
};

function App() {
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [sharingId, setSharingId] = useState('');
  const [monitoringId, setMonitoringId] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [isSharingMode, setIsSharingMode] = useState(false);
  const [isMonitoringMode, setIsMonitoringMode] = useState(false);

  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(socketUrl, {
    onOpen: () => console.log('socket opened'),
    shouldReconnect: closeEvent => true,
  });

  useEffect(() => {
    let sendCoordsInterval: NodeJS.Timeout;
    if (isSharingMode) {
      sendCoordsInterval = setInterval(() => {
        /*
          sendMessage 를 할 수 있도록 한다.
        */
      }, 1000);
    }
    const mapInfoElement = document.getElementById('Map-info');
    navigator.geolocation.getCurrentPosition(position => {
      const [lat, lng] = [position.coords.latitude, position.coords.longitude];
      setPosition({ lat, lng });
      if (mapInfoElement) {
        mapInfoElement.innerHTML = `lat: ${lat}, lng: ${lng}`;
      }
    });
    navigator.geolocation.watchPosition(position => {
      const [lat, lng] = [position.coords.latitude, position.coords.longitude];
      setPosition({ lat, lng });
      if (mapInfoElement) {
        mapInfoElement.innerHTML = `lat: ${lat}, lng: ${lng}`;
      }
    });

    return () => {
      clearInterval(sendCoordsInterval);
    };
  });

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setMonitoringId(event.target.value);
  };

  const onClickStartButton = () => {
    setIsStarted(true);
  };

  const onClickShareButton = () => {
    setSharingId(short.generate());
    setIsSharingMode(true);
  };

  const onClickMonitorButton = () => {
    setIsMonitoringMode(true);
  };

  const onClickCancelButton = () => {
    setIsSharingMode(false);
    setIsMonitoringMode(false);
    setIsStarted(false);
    setMonitoringId('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <span>왜안와?</span>
          <span id="Sub-title"> - Where Are You?</span>
        </h1>
      </header>
      <nav>
        <ul>
          {!isSharingMode && !isMonitoringMode ? (
            <>
              <li className="Button" onClick={onClickShareButton}>
                내 위치 공유
              </li>
              <li className="Button" onClick={onClickMonitorButton}>
                위치 확인
              </li>
            </>
          ) : null}
          {isSharingMode
            ? SharingNavComponent({
                sharingId,
                sharingButtonHandler: onClickShareButton,
                cancelButtonHandler: onClickCancelButton,
              })
            : null}
          {isMonitoringMode
            ? MonitoringNavComponent({
                monitoringId,
                isStarted,
                inputChangeHandler: onChangeInput,
                startButtonHandler: onClickStartButton,
                cancelButtonHandler: onClickCancelButton,
              })
            : null}
        </ul>
      </nav>
      <section className="App-section">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAY6Oz0_r6sq0iI1Y5i_lVcQulpHaRuiDk' }}
          center={position}
          defaultZoom={17}
        >
          {isMonitoringMode ? (
            <MarkerComponent
              lat={lastJsonMessage.lat}
              lng={lastJsonMessage.lng}
            />
          ) : (
            <MarkerComponent lat={position.lat} lng={position.lng} />
          )}
        </GoogleMapReact>
      </section>
    </div>
  );
}

export default App;
