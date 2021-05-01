import React from 'react';
// import GoogleMapReact from 'google-map-react';
// import Marker from 'react-spinners/PuffLoader';
// import short from 'short-uuid';
// import useWebSocket from 'react-use-websocket';
import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Front from './page/Front';

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

const App = (): React.FC => (
  <Router>
    <GlobalStyle />
    <Switch>
      <Route path="/">
        <Front />
      </Route>
    </Switch>
  </Router>
);

export default App;
