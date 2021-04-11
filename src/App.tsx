import React, { useEffect, useState } from 'react';
import './App.css';
import GoogleMapReact from 'google-map-react';
import Marker from 'react-spinners/PuffLoader';
import short from 'short-uuid';

const MarkerComponent = ({lat, lng}: {lat: number, lng: number}) => <Marker color={'#4A90E2'} loading={true} size={20} />

const SharingNavComponent = ({isSharingMode, sharingId, buttonHandler}: {isSharingMode: boolean, sharingId: string, buttonHandler: () => void}) => {
  if (!isSharingMode) {
    return (
      <>
        <li className="Button" onClick={buttonHandler}>내 위치 공유</li>
        <li className="Button">위치 확인</li>
      </> 
    )
  }
  return <li>공유 ID: {sharingId}</li>
}

const MonitoringNavComponent = ({isMonitoringMode}: {isMonitoringMode: boolean}) => <></>

function App() {
  const [position, setPosition] = useState({lat: 0, lng: 0})
  const [sharingId, setSharingId] = useState('')
  const [isSharingMode, setIsSharingMode] = useState(false)

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
          {SharingNavComponent({isSharingMode, sharingId, buttonHandler: onClickShareButton})}
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
