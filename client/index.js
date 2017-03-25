import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './containers/App';
import configureStore from './store/configureStore';
import * as serverActions from './actions/ServerActions';
import './styles/index.css';

const store = configureStore();

serverActions.init(store);

render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);
