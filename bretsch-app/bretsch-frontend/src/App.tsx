import 'fontsource-roboto';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { DarkModeContext } from './contexts/DarkModeContext';
import useLocalStorage from './util/LocalStorageHook';

export const App = () => {
  const [darkModeState, setDarkModeState] = useLocalStorage('App.darkModeState', true);

  const toggleDarkModeState = () => {
    setDarkModeState(!darkModeState);
  };

  const darkMode = {
    darkMode: darkModeState,
    toggleDarkMode: toggleDarkModeState,
  };

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        overrides: {
          MuiTypography: {
            root: {
              wordBreak: 'break-all',
            },
          },
        },
        palette: {
          primary: {
            main: '#5CE533',
          },
          type: darkModeState ? 'dark' : 'light',
        },
      }),
    [darkModeState],
  );

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={10} anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}>
        <CssBaseline />
        <DarkModeContext.Provider value={darkMode}>
          <BrowserRouter>
            <Switch>
              <Route path="/" component={DashboardPage} />
            </Switch>
          </BrowserRouter>
        </DarkModeContext.Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};
