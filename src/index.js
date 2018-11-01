import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App/>, document.getElementById('root'), document.querySelector('#app'));

serviceWorker.unregister();
