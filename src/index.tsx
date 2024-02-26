import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { offers } from './mocks/offers';

const PLACES_COUNT: number = 300;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App placesCount={PLACES_COUNT} offers={offers} />
  </React.StrictMode>
);
