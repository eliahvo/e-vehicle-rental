import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { SnackbarProvider } from 'notistack';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <SnackbarProvider maxSnack={10} anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}>
    <App />
  </SnackbarProvider>,
  rootElement,
);
