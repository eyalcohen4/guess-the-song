import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import 'firebase/auth';
import './helpers/firebase';

import Routes from './routes';

import 'firebaseui/dist/firebaseui.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

ReactDOM.render(
  <Routes history={browserHistory} />,
  document.getElementById('root')
);
