import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
const Page = require(process.env.DOC_PATH).default;


ReactDOM.render(
  <App page={Page} />,
  document.getElementById('root'),
);


if (module.hot) {
  module.hot.accept();
}
