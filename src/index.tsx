import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './components/app';
import { AuthorizationStatus } from './const';
import './polyfills';
import { getToken } from './services/token';
import { store } from './store';
import { userActions } from './store/slices/user';

store.dispatch(
  getToken() ? userActions.checkAuthorization() : userActions.setAuthorization(AuthorizationStatus.NoAuth)
);

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
