import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import EditField from './EditField';

import '@atlaskit/css-reset';

ReactDOM.render(
  <React.StrictMode>
    <EditField/>
    {/* <App/> */}
  </React.StrictMode>,
  document.getElementById('root')
);
