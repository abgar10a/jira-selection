import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ConfigPage from './ConfigPage';

import '@atlaskit/css-reset';

ReactDOM.render(
  <React.StrictMode>
    <ConfigPage/>
    {/* <App/> */}
  </React.StrictMode>,
  document.getElementById('root')
);
