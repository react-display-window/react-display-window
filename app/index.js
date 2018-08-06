import React from 'react';
import ReactDOM from 'react-dom';

const Page = require(process.env.DOC_PATH).default;


ReactDOM.render(
  <Page />,
  document.getElementById('root'),
);
