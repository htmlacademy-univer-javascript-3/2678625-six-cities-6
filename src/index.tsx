import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import offers from './mocks/offers';
import { Provider } from 'react-redux';
import store from './store';
import { setOffers } from './store/reducer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(setOffers(offers));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);