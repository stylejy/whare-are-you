import React from 'react';
// import GoogleMapReact from 'google-map-react';
// import Marker from 'react-spinners/PuffLoader';
// import short from 'short-uuid';
// import useWebSocket from 'react-use-websocket';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Front from './page/Front';

const App = (): React.FC => (
  <Router>
    <Switch>
      <Route path="/">
        <Front />
      </Route>
    </Switch>
  </Router>
);

export default App;
