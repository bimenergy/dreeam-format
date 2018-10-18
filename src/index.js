// Emulate a full ES2015+ environment. Should be called before all other code statements
import 'babel-polyfill';
// Main packages
import React from 'react';
import { render } from 'react-dom';
import { I18nextProvider } from 'react-i18next';
// Material-UI
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// local
import i18n from './i18n';
import App from './App';

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: 'rgb(128, 204, 41)',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

const i18nOptions = {
  whitelist: ['en'],
};

render(
  <I18nextProvider i18n={i18n(i18nOptions)}>
    <MuiThemeProvider theme={muiTheme}>
      <App />
    </MuiThemeProvider>
  </I18nextProvider>
  , document.getElementById('app'),
);
