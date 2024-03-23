import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { Provider } from 'react-redux';
import { store } from './store';
import './polyfills';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkAuthorization } from './store/thunks/user';

store.dispatch(checkAuthorization());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer position="top-center" />
      <App />
    </Provider>
  </React.StrictMode>
);
