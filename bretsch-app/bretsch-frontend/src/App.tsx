import 'fontsource-roboto';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { AppContext } from './contexts/AppContext';
import useLocalStorage from './util/LocalStorageHook';
import { Vehicle } from './util/EntityInterfaces';
import { fetchVehicles } from './util/RequestHelper';

export const App = () => {
  const [darkModeState, setDarkModeState] = useLocalStorage('App.darkModeState', true);
  const [vehicles, setVehicles] = useLocalStorage<Vehicle[]>('App.vehicles', []);

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

  const toggleDarkModeState = () => {
    setDarkModeState(!darkModeState);
  };

  const loadVehicles = async () => {
    setVehicles(fetchVehicles());
  };

  const context = {
    darkMode: darkModeState,
    reloadVehicles: loadVehicles,
    toggleDarkMode: toggleDarkModeState,
    vehicleData: vehicles,
  };

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={10} anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}>
        <CssBaseline />
        <AppContext.Provider value={context}>
          <BrowserRouter>
            <Switch>
              <Route path="/" component={DashboardPage} />
            </Switch>
          </BrowserRouter>
        </AppContext.Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};
