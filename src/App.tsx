import React, { useEffect, useState } from 'react';
import './App.css';
import GoogleMapReact from 'google-map-react';
import Marker from 'react-spinners/PuffLoader';
import short from 'short-uuid';

const MarkerComponent = ({lat, lng}: {lat: number, lng: number}) => <Marker color={'#4A90E2'} loading={true} size={20} />

const SharingNavComponent = ({sharingId, sharingButtonHandler, cancelButtonHandler}: {sharingId: string, sharingButtonHandler: () => void, cancelButtonHandler: () => void}) => (
  <>
    <li>공유 ID: {sharingId}</li>
    <button onClick={cancelButtonHandler}>공유취소</button>
  </>
)

const MonitoringNavComponent = ({monitoringId, cancelButtonHandler}: {monitoringId: string, cancelButtonHandler: () => void}) => {
  if (monitoringId) {

  }
  return (
    <>
      <li>공유 ID를 입력해주세요: </li>
      <input></input>
      <button>모니터 시작</button>
      <button onClick={cancelButtonHandler}>돌아가기</button>
    </>
  )
}

function App() {
  const [position, setPosition] = useState({lat: 0, lng: 0})
  const [sharingId, setSharingId] = useState('')
  const [monitoringId, setMonitoringId] = useState('')
  const [isSharingMode, setIsSharingMode] = useState(false)
  const [isMonitoringMode, setIsMonitoringMode] = useState(false)
  

  useEffect(() => {
    const mapInfoElement = document.getElementById('Map-info');
    navigator.geolocation.getCurrentPosition((position) => {
      const [lat, lng] = [
        position.coords.latitude,
        position.coords.longitude
      ]
      setPosition({lat, lng})
      if (mapInfoElement) {
        mapInfoElement.innerHTML = `lat: ${lat}, lng: ${lng}`;
      }
    })
    navigator.geolocation.watchPosition((position) => { 
      const [lat, lng] = [
        position.coords.latitude,
        position.coords.longitude
      ]
      setPosition({lat, lng})
      if (mapInfoElement) {
        mapInfoElement.innerHTML = `lat: ${lat}, lng: ${lng}`;
      }
    });
  });

  const onClickShareButton = () => {
    setSharingId(short.generate())
    setIsSharingMode(true)
  }

  const onClickMonitorButton = () => {
    setIsMonitoringMode(true)
  }

  const onClickCancelButton = () => {
    setIsSharingMode(false);
    setIsMonitoringMode(false);
  }

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
          {
            !isSharingMode && !isMonitoringMode ? <>
              <li className="Button" onClick={onClickShareButton}>내 위치 공유</li>
              <li className="Button" onClick={onClickMonitorButton}>위치 확인</li>
            </> : null
          }
          {
            isSharingMode ? SharingNavComponent({sharingId, sharingButtonHandler: onClickShareButton, cancelButtonHandler: onClickCancelButton}) : null
          }
          {
            isMonitoringMode ? MonitoringNavComponent({monitoringId, cancelButtonHandler: onClickCancelButton}) : null
          }
        </ul>
      </nav>
      <section className="App-section">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAY6Oz0_r6sq0iI1Y5i_lVcQulpHaRuiDk' }}
          center={position}
          defaultZoom={17}
        >
          <MarkerComponent lat={position.lat} lng={position.lng} />
        </GoogleMapReact>
      </section>
    </div>
  );
}

export default App;
